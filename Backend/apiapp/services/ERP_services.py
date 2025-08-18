"""
ERPNext integration services for Django
--------------------------------------

Production-oriented helper module to talk to ERPNext from a Django backend.

Features
- Typed, testable service class (ERPNextClient) with retry/backoff, timeouts,
  and structured error handling.
- Safe idempotency for Stripe webhook-driven order creation using Django cache.
- Upsert helpers for Customer and Item (Product) in ERPNext.
- Sales Order creation with sensible defaults and session-based idempotency.
- Inventory lookup placeholder that you can call from Django later.

Security
- Uses API Key/Secret from Django settings (never hard-code).
- Adds request signing header format required by ERPNext (`Authorization: token ...`).
- Strict timeouts and minimal exposed data.

Usage
- See bottom of file for an example of how to call `process_checkout_session`
  inside your `stripe_webhook` view.

Notes
- Endpoints are implemented against ERPNext REST API conventions.
- You may need to adapt field names to your ERPNext doctypes/customizations.

Author: you + ChatGPT
"""
from __future__ import annotations

import json
import logging
import time
from dataclasses import dataclass
from decimal import Decimal
from typing import Any, Dict, List, Optional, Tuple

import requests
from django.conf import settings
from django.core.cache import cache
from django.db import transaction

logger = logging.getLogger(__name__)


# -----------------------------
# Data models (DTOs)
# -----------------------------

@dataclass
class ShipAddress:
    line1: str
    line2: str
    city: str
    state: str
    postal_code: str
    country: str

@dataclass
class CartItem:
    id: int
    name: str
    quantity: int
    price: Decimal
    sku: Optional[str] = None


# -----------------------------
# Exceptions
# -----------------------------

class ERPError(Exception):
    """Generic ERPNext communication error."""

class ERPConflict(ERPError):
    """Idempotency or duplicate resource conflict."""


# -----------------------------
# ERPNext API Client
# -----------------------------

class ERPNextClient:
    """Thin, resilient HTTP client for ERPNext."""

    def __init__(
        self,
        base_url: Optional[str] = None,
        api_key: Optional[str] = None,
        api_secret: Optional[str] = None,
        timeout: int = 15,
        max_retries: int = 3,
        backoff_factor: float = 0.75,
    ) -> None:
        self.base_url = (base_url or settings.ERPNEXT_BASE_URL).rstrip("/")
        self.api_key = api_key or settings.ERPNEXT_API_KEY
        self.api_secret = api_secret or settings.ERPNEXT_API_SECRET
        self.timeout = timeout
        self.max_retries = max_retries
        self.backoff_factor = backoff_factor

        # Basic session reuse for connection pooling
        self._session = requests.Session()
        self._session.headers.update({
            "Authorization": f"token {self.api_key}:{self.api_secret}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        })

    # ---- Low-level request wrapper with retries
    def _request(
        self,
        method: str,
        path: str,
        params: Optional[Dict[str, Any]] = None,
        json_body: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        url = f"{self.base_url}{path}"
        last_err: Optional[Exception] = None
        for attempt in range(1, self.max_retries + 1):
            try:
                resp = self._session.request(
                    method=method.upper(),
                    url=url,
                    params=params,
                    json=json_body,
                    timeout=self.timeout,
                )
                if 200 <= resp.status_code < 300:
                    return resp.json()

                # 409/412 can be duplicates or conflicts; surface clearly
                if resp.status_code in (409, 412):
                    raise ERPConflict(f"ERPNext conflict: {resp.text}")

                # transient server errors
                if resp.status_code >= 500:
                    raise ERPError(
                        f"ERPNext server error {resp.status_code}: {resp.text}"
                    )
                # Other client errors: raise with detail
                raise ERPError(
                    f"ERPNext HTTP {resp.status_code}: {resp.text} (url={url})"
                )
            except (requests.Timeout, requests.ConnectionError, ERPError) as e:
                last_err = e
                if attempt < self.max_retries:
                    sleep_s = self.backoff_factor * (2 ** (attempt - 1))
                    logger.warning(
                        "ERPNext request failed (attempt %s/%s): %s; retrying in %.2fs",
                        attempt,
                        self.max_retries,
                        e,
                        sleep_s,
                    )
                    time.sleep(sleep_s)
                else:
                    break
        assert last_err is not None
        raise last_err

    # ---- High-level helpers

    def find_customer_by_email(self, email: str) -> Optional[str]:
        """Return ERPNext Customer.name if found, else None."""
        params = {
            "fields": json.dumps(["name", "customer_name", "email_id"]),
            "filters": json.dumps([["Customer", "email_id", "=", email]]),
            "limit": 1,
        }
        data = self._request("GET", "/api/resource/Customer", params=params)
        items = data.get("data") or data.get("message") or []
        if items:
            return items[0]["name"]
        return None

    def create_customer(self, email: str, full_name: str, Shipaddress: ShipAddress) -> str:
        payload = {
            "customer_type": "Individual",
            "customer_name": full_name or email,
            "email_id": email,
        }
        created = self._request("POST", "/api/resource/Customer", json_body=payload)
        customer_name = (created.get("data") or created.get("message") or {}).get("name")
        if not customer_name:
            raise ERPError("Customer creation returned no name")

        # Create a primary Address and link to Customer
        addr_payload = {
            "address_title": full_name or email,
            "address_line1": Shipaddress.line1,
            "address_line2": Shipaddress.line2,
            "city": Shipaddress.city,
            "state": Shipaddress.state,
            "pincode": Shipaddress.postal_code,
            "country": "United States", #NEEDS TO CHANGE WHEN GOING INTERNATIONAL
            "links": [
                {"link_doctype": "Customer", "link_name": customer_name}
            ],
        }
        try:
            self._request("POST", "/api/resource/Address", json_body=addr_payload)
        except ERPError as e:
            logger.warning("Address creation failed for customer %s: %s", customer_name, e)
        return customer_name
    
    
    def upsert_customer(self, email: str, full_name: str, Shipaddress: ShipAddress) -> str:
        existing = self.find_customer_by_email(email)
        if existing:
            return existing
        return self.create_customer(email, full_name, Shipaddress)

    def find_item_by_code(self, item_code: str) -> bool:
        params = {
            "fields": json.dumps(["name", "item_code"]),
            "filters": json.dumps([["Item", "item_code", "=", item_code]]),
            "limit": 1,
        }
        data = self._request("GET", "/api/resource/Item", params=params)
        items = data.get("data") or data.get("message") or []
        return bool(items)

    def create_item(
        self,
        item_code: str,
        item_name: str,
        standard_rate: Decimal,
        is_stock_item: int = 1,
        stock_uom: str = "Nos",
    ) -> str:
        payload = {
            "item_code": item_code,
            "item_name": item_name,
            "item_group": "Products",  # Adjust to your setup
            "is_stock_item": is_stock_item,
            "stock_uom": stock_uom,
            "standard_rate": float(standard_rate),
        }
        created = self._request("POST", "/api/resource/Item", json_body=payload)
        name = (created.get("data") or created.get("message") or {}).get("name")
        if not name:
            raise ERPError("Item creation returned no name")
        return name

    def upsert_item(
        self,
        item_code: str,
        item_name: str,
        standard_rate: Decimal,
        is_stock_item: int = 1,
        stock_uom: str = "Nos",
    ) -> str:
        if self.find_item_by_code(item_code):
            return item_code
        return self.create_item(
            item_code=item_code,
            item_name=item_name,
            standard_rate=standard_rate,
            is_stock_item=is_stock_item,
            stock_uom=stock_uom,
        )

    def create_sales_order(
        self,
        customer_name: str,
        items: List[Tuple[str, int, Decimal]],
        delivery_date: Optional[str] = None,
        stripe_session_id: Optional[str] = None,
        shipping_address: Optional[ShipAddress] = None,
        currency: str = "USD",
    ) -> str:
        """Create a Sales Order; returns SO name.

        Uses `po_no` to store `stripe_session_id` for idempotency.
        """
        # Prevent duplicates: look for existing SO by po_no (map to stripe session)
        if stripe_session_id:
            params = {
                "fields": json.dumps(["name", "po_no"]),
                "filters": json.dumps([["Sales Order", "po_no", "=", stripe_session_id]]),
                "limit": 1,
            }
            existing = self._request("GET", "/api/resource/Sales Order", params=params)
            rows = existing.get("data") or existing.get("message") or []
            if rows:
                return rows[0]["name"]

        erp_items = [
            {"item_code": code, "qty": int(qty), "rate": float(rate)}
            for code, qty, rate in items
        ]
        payload: Dict[str, Any] = {
            "customer": customer_name,
            "currency": currency,
            "po_no": stripe_session_id,
            "items": erp_items,
        }
        if delivery_date:
            payload["delivery_date"] = delivery_date

        # Optionally set shipping address name if one exists; otherwise ERPNext will pick default
        # (Advanced: you can create a dedicated Address and set shipping_address_name / shipping_address)
        created = self._request("POST", "/api/resource/Sales Order", json_body=payload)
        name = (created.get("data") or created.get("message") or {}).get("name")
        if not name:
            raise ERPError("Sales Order creation returned no name")
        return name

    def get_item_stock(self, item_code: str, warehouse: Optional[str] = None) -> Decimal:
        """Return a simple stock figure.

        Implementation: query Bin for actual_qty; if multiple bins, sum.
        Adjust for your ERPNext version if needed.
        """
        filters = [["Bin", "item_code", "=", item_code]]
        if warehouse:
            filters.append(["Bin", "warehouse", "=", warehouse])
        params = {
            "fields": json.dumps(["actual_qty"]),
            "filters": json.dumps(filters),
            "limit": 100,
        }
        data = self._request("GET", "/api/resource/Bin", params=params)
        rows = data.get("data") or data.get("message") or []
        total = Decimal("0")
        for r in rows:
            try:
                total += Decimal(str(r.get("actual_qty") or 0))
            except Exception:
                continue
        return total
    


# -----------------------------
# Orchestration for Stripe checkout.session.completed
# -----------------------------

def process_checkout_session(
    session: Dict[str, Any],
    cart_items: List[Dict[str, Any]],
    shipping: ShipAddress,
    *,
    full_name: Optional[str] = None,
    currency: str = "USD",
    cache_ttl_seconds: int = 600,
) -> Dict[str, Any]:
    """Idempotently mirror a completed Stripe Checkout Session into ERPNext.

    Steps
    1) Prevent duplicate processing via cache key using Stripe session id
    2) Upsert Customer (by email)
    3) Upsert Items (by SKU or product ID)
    4) Create Sales Order (po_no set to stripe session id)
    """
    session_id = session.get("id")
    email = (session.get("customer_details") or {}).get("email")
    if not session_id or not email:
        raise ERPError("Stripe session missing id or customer email")

    cache_key = f"stripe_so_lock:{session_id}"
    # cache.add returns True only if the key did not exist
    if not cache.add(cache_key, "1", timeout=cache_ttl_seconds):
        logger.info("Stripe session %s already processed (cache lock)", session_id)
        return {"status": "duplicate_suppressed"}

    client = ERPNextClient()

    with transaction.atomic():
        # 1) Customer
        customer_name = client.upsert_customer(
            email=email,
            full_name=full_name or email.split("@")[0],
            Shipaddress=shipping,
        )

        # 2) Items -> build list for Sales Order
        so_items: List[Tuple[str, int, Decimal]] = []
        for item in cart_items:
            # Prefer SKU if present; fallback to the internal product ID
            item_code = (item.get("sku") or str(item.get("id"))).strip()
            item_name = item.get("name") or item_code
            qty = int(item.get("quantity") or 1)
            rate = Decimal(str(item.get("price") or "0"))

            client.upsert_item(item_code=item_code, item_name=item_name, standard_rate=rate)
            so_items.append((item_code, qty, rate))

        # 3) Create Sales Order (idempotent by po_no)
        so_name = client.create_sales_order(
            customer_name=customer_name,
            items=so_items,
            stripe_session_id=session_id,
            shipping_address=shipping,
            currency=currency,
        )

    return {"status": "created", "sales_order": so_name, "customer": customer_name}

def get_orders_for_user(self, user) -> list[dict]:
    customer_name = self.find_customer_by_email(user.email)
    if not customer_name:
        raise ERPError(f"No ERPNext customer found for {user.email}")
    
    """Return a list of Sales Orders for the given ERPNext Customer.name."""
    params = {
        "fields": json.dumps([
            "name",
            "transaction_date",
            "customer",
            "grand_total",
            "status"
        ]),
        "filters": json.dumps([["Sales Order", "customer", "=", customer_name]]),
        "order_by": "transaction_date desc",
    }
    data = self._request("GET", "/api/resource/Sales Order", params=params)
    return data.get("data") or data.get("message") or []

def get_order_details(self, order_name: str) -> dict:
    """
    Fetch full details of a Sales Order from ERPNext, including line items.
    order_name = e.g. "SO-0001"
    """
    fields = [
        "name",
        "transaction_date",
        "customer",
        "grand_total",
        "status",
        "items.item_code",
        "items.item_name",
        "items.qty",
        "items.rate",
        "items.amount"
    ]
    
    params = {
        "fields": json.dumps(fields)
    }
    
    data = self._request("GET", f"/api/resource/Sales Order/{order_name}", params=params)
    return data.get("data") or data.get("message") or {}