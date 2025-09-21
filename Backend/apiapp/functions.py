import logging
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from decimal import Decimal
from typing import Optional
from .models import Product, ProductPrice, Category
from vendorapi.functions import get_prices_for_parts

logger = logging.getLogger(__name__)

def get_category_margin(category: Optional[Category]) -> Optional[Decimal]:
    """
    Recursively find the margin for a category or its parents.
    Returns None if no margin is found.
    """
    if not category:
        return None
    if category.margin is not None:
        return category.margin
    return get_category_margin(category.parent_category)

def calculate_sell_price(product_id: int, cost: Decimal, user_id: Optional[int] = None) -> Decimal:
    """
    Calculate the sell price based on cost and product/category margin.
    User discount is applied at runtime, not stored.
    """
    try:
        product = Product.objects.get(id=product_id)
    except ObjectDoesNotExist:
        logger.error(f"Product ID {product_id} not found for sell price calculation.")
        raise ValueError("Product not found")
    
    # Get margin: product-specific or category-based
    pricedata = product.prices if hasattr(product, 'prices') and product.prices else None
    margin = pricedata.custom_margin if pricedata and pricedata.custom_margin else None
    if margin is None:
        margin = get_category_margin(product.category) or Decimal('20.00')  # Default 20%
    
    # Get user discount (placeholder; implement later)
    user_discount = Decimal('0.00')
    if user_id:
        # TODO: Implement contract-based discount lookup
        logger.info(f"User {user_id} discount not implemented yet.")
        pass

    # Calculate base sell price: cost * (1 + margin%)
    margin_fraction = margin / Decimal('100.0')
    base_sell_price = cost * (1 + margin_fraction)

    # Apply user discount at runtime
    discount_fraction = user_discount / Decimal('100.0')
    final_sell_price = base_sell_price * (1 - discount_fraction)
    return final_sell_price.quantize(Decimal('0.01'))

def get_sell_price(product_id: int, user_id: Optional[int] = None) -> dict:
    """
    Retrieve or update the sell price for a product.
    Returns: {'status': 'success'|'error', 'sell_price': Decimal|None, 'message': str|None}
    """
    try:
        product = Product.objects.get(id=product_id)
    except ObjectDoesNotExist:
        logger.error(f"Product ID {product_id} not found.")
        return {'status': 'error', 'sell_price': None, 'message': 'Product not found'}
    
    # Check for existing price
    pricedata = product.prices if hasattr(product, 'prices') and product.prices else None
    if pricedata is None:
        logger.error(f"No price records for this product {product_id}.")
        return {'status': 'success', 'sell_price': None, 'message': 'No valid pricing available'}
    
    if pricedata and hasattr(pricedata, 'valid_until') and pricedata.valid_until and pricedata.valid_until > timezone.now():
        logger.info(f"Returning cached sell price for product {product_id}: {pricedata.sell_price}")
        # Apply user discount at runtime
        return {'status': 'success', 'sell_price': product.prices.sell_price, 'message': None}

    # Check if automatic fetching is enabled
    is_automatic = pricedata.is_automatic if pricedata else product.is_auto
    if not is_automatic:
        logger.info(f"Non-automatic pricing for product {product_id}; price unavailable.")
        return {'status': 'success', 'sell_price': None, 'message': 'Price unavailable'}
    print("Automatic pricing")
    # Fetch vendor prices
    vendor_data = get_prices_for_parts([product_id])
    suppliers = vendor_data.get(product_id, {})
    print(vendor_data)
    if 'error' in suppliers:
        logger.error(f"Failed to fetch vendor prices for product {product_id}: {suppliers['error']}")
        return {'status': 'error', 'sell_price': None, 'message': suppliers['error']}

    # Find lowest unit price (quantity=1) with stock
    min_cost = None
    for supplier, data in suppliers.items():
        if 'error' in data:
            continue
        if data.get('stock', 0) == 0:
            continue
        for variation in data.get('variations', []):
            if variation.get('stock', 0) == 0:
                continue
            for pb in variation.get('price_breaks', []):
                if pb['break_quantity'] == 1:
                    cost = Decimal(str(pb['unit_price']))
                    if min_cost is None or cost < min_cost:
                        min_cost = cost

    if min_cost is None:
        logger.error(f"No valid cost found for product {product_id}.")
        return {'status': 'success', 'sell_price': None, 'message': 'No valid vendor cost available'}

    # Calculate and store base sell price (without user discount)
    try:
        # Calculate base sell price without user discount
        base_sell_price = calculate_sell_price(product_id, min_cost, user_id)

        if not isinstance(base_sell_price, (int, float, Decimal)):
            logger.error(f"Invalid sell price returned for product {product_id}:  {type(base_sell_price).__name__} -> {base_sell_price}")
            return {'status': 'error', 'sell_price': None, 'message': 'Invalid sell price calculated'}


        # Update or create the single ProductPrice record
        ProductPrice.objects.update_or_create(
            product=product,
            defaults={
                'sell_price': base_sell_price,
                'valid_until': timezone.now() + timezone.timedelta(days=getattr(settings, 'AUTO_PRICE_VALIDITY_DAYS', 7)),
                'method': 'automatic',
                'is_automatic': is_automatic,
                'custom_margin': pricedata.custom_margin if pricedata else None,
                'is_discountable': pricedata.is_discountable if pricedata else True,
            }
        )

        
        logger.info(f"Updated sell price for product {product_id}: {base_sell_price}")
        return {'status': 'success', 'sell_price': base_sell_price, 'message': None}
    except Exception as e:
        logger.error(f"Failed to calculate/store sell price for product {product_id}: {str(e)}")
        return {'status': 'error', 'sell_price': None, 'message': 'Failed to calculate sell price'}