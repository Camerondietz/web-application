import logging
from django.core.exceptions import ObjectDoesNotExist
from apiapp.models import Product, ProductSupplier, Supplier  # Adjust app name if different
from .services.digikey_client import DigiKeyAPI

logger = logging.getLogger(__name__)

def get_prices_for_parts(product_ids: list[int]) -> dict:
    """
    Fetch prices and stock for a list of product IDs across suppliers.
    Returns: {product_id: {supplier_name: {'stock': int, 'variations': [{'supplier_pn': str, 'package_type': str, 'stock': int, 'price_breaks': [{'quantity': int, 'unit_price': float}]}]}}}
    """
    result = {}
    for pid in product_ids:
        try:
            product = Product.objects.get(id=pid)
        except ObjectDoesNotExist:
            logger.warning(f"Product ID {pid} not found.")
            result[pid] = {'error': 'Product not found'}
            continue

        result[pid] = {}
        for ps in ProductSupplier.objects.filter(product=product):
            supplier_name = ps.supplier.name.lower()
            supplier_sku = ps.supplier_sku
            if not supplier_sku:
                logger.warning(f"No supplier SKU for product {pid}, supplier {supplier_name}.")
                result[pid][supplier_name] = {'error': 'No supplier SKU provided'}
                continue

            if supplier_name == 'digikey':
                try:
                    pricing = DigiKeyAPI.get_pricing_and_stock(supplier_sku)
                    result[pid][supplier_name] = pricing
                except ValueError as e:
                    logger.error(f"Error fetching pricing for product {pid}, supplier {supplier_name}: {str(e)}")
                    result[pid][supplier_name] = {'error': str(e)}
            # Add elif for future suppliers (e.g., elif supplier_name == 'mouser': MouserAPI.get_pricing_and_stock(supplier_sku))
            else:
                logger.warning(f"Unsupported supplier {supplier_name} for product {pid}.")
                result[pid][supplier_name] = {'error': 'Unsupported supplier'}

    return result

def get_product_details(product_id: int) -> dict:
    """
    Fetch full product details for a single product ID across suppliers.
    Returns: {supplier_name: full_api_response_dict}
    """
    try:
        product = Product.objects.get(id=product_id)
    except ObjectDoesNotExist:
        logger.warning(f"Product ID {product_id} not found.")
        return {'error': 'Product not found'}

    result = {}
    for ps in ProductSupplier.objects.filter(product=product):
        supplier_name = ps.supplier.name.lower()
        supplier_sku = ps.supplier_sku
        if not supplier_sku:
            logger.warning(f"No supplier SKU for product {product_id}, supplier {supplier_name}.")
            result[supplier_name] = {'error': 'No supplier SKU provided'}
            continue

        if supplier_name == 'digikey':
            try:
                details = DigiKeyAPI.fetch_product_details(supplier_sku)
                result[supplier_name] = details
            except ValueError as e:
                logger.error(f"Error fetching details for product {product_id}, supplier {supplier_name}: {str(e)}")
                result[supplier_name] = {'error': str(e)}
        # Add elif for future suppliers
        else:
            logger.warning(f"Unsupported supplier {supplier_name} for product {product_id}.")
            result[supplier_name] = {'error': 'Unsupported supplier'}

    return result