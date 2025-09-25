import requests
import os
import json
from decimal import Decimal
from django.shortcuts import get_object_or_404
from apiapp.models import Product

UPS_CLIENT_ID = os.getenv("UPS_CLIENT_ID")
UPS_CLIENT_SECRET = os.getenv("UPS_CLIENT_SECRET")

def get_access_token():
    print("getting token")
    url = "https://onlinetools.ups.com/security/v1/oauth/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials"
    }
    response = requests.post(url, headers=headers, data=data, auth=(UPS_CLIENT_ID, UPS_CLIENT_SECRET))
    print(response.json()["access_token"])
    response.raise_for_status()
    
    return response.json()["access_token"]

def get_shipping_rates(destination_zip: str, weight_lbs: float):
    token = get_access_token()
    print("Got token")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    # UPS requires weight in pounds, dimensions in inches
    data = {
        "RateRequest": {
            "Request": {
                "TransactionReference": {
                    "CustomerContext": "Rating and Service"
                }
            },
            "Shipment": {
                "Shipper": {
                    "Name": "AVENTREK",
                    "ShipperNumber": "01W91B",  # Required for negotiated rates
                    "Address": {
                        "AddressLine": ["12440 alameda trace circle"],
                        "City": "Austin",
                        "StateProvinceCode": "TX",
                        "PostalCode": "78727",
                        "CountryCode": "US"
                    }
                },
                "ShipTo": {
                    "Name": "Customer",
                    "Address": {
                        "AddressLine": ["416 luna vista"],
                        "City": "Austin",
                        "StateProvinceCode": "TX",
                        "PostalCode": destination_zip,
                        "CountryCode": "US"
                    }
                },
                "ShipFrom": {
                    "Name": "Your Company",
                    "Address": {
                        "AddressLine": ["12440 alameda trace circle"],
                        "City": "Austin",
                        "StateProvinceCode": "TX",
                        "PostalCode": "78727",
                        "CountryCode": "US"
                    }
                },
                "Package": [
                    {
                        "PackagingType": {
                            "Code": "02",  # Customer Supplied Package
                            "Description": "Package"
                        },
                        "Dimensions": {
                            "UnitOfMeasurement": {"Code": "IN"},
                            "Length": "10",
                            "Width": "8",
                            "Height": "4"
                        },
                        "PackageWeight": {
                            "UnitOfMeasurement": {"Code": "LBS"},
                            "Weight": str(weight_lbs)
                        }
                    }
                ]
            }
        }
    }

    url = "https://onlinetools.ups.com/api/rating/v2409/shop"
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    print(response)
    return response.json()

def get_single_shipping_cost(cart_items, destination_zip=None):
    """
    Calculate the single shipping cost for the cart.
    - Sums total weight of cart items (default 1 lb if weight is None).
    - Uses UPS API to get the lowest rate if destination_zip is provided.
    - Falls back to flat rate ($5/lb, min $10) if no address or API fails.
    """
    try:
        # Calculate total weight
        total_weight = 0
        for item in cart_items:
            product = get_object_or_404(Product, pk=item['id'])
            quantity = int(item['quantity'])
            weight = product.weight or 1  # Default to 1 lb if weight is None
            total_weight += weight * quantity

        # Flat rate fallback ($5 per pound, minimum $10)
        flat_rate = max(Decimal(str(total_weight * 5)), Decimal('10.00'))

        if not destination_zip:
            print("No destination ZIP provided, using flat rate")
            return flat_rate

        # Get UPS rates
        rates_response = get_shipping_rates(destination_zip, total_weight)
        if not rates_response or 'RateResponse' not in rates_response:
            print("UPS API failed, using flat rate")
            return flat_rate

        # Extract lowest rate
        rated_shipments = rates_response['RateResponse']['RatedShipment']
        if not rated_shipments:
            print("No UPS rates available, using flat rate")
            return flat_rate

        lowest_rate = min(
            Decimal(r['TotalCharges']['MonetaryValue'])
            for r in rated_shipments
            if r['TotalCharges']['CurrencyCode'] == 'USD'
        )
        return max(lowest_rate, Decimal('10.00'))  # Enforce minimum $10
    except Exception as e:
        print(f"Error in get_single_shipping_cost: {str(e)}")
        return flat_rate