# vendorapi/services/digikey_client.py
import requests
import logging
from django.conf import settings
from datetime import datetime, timedelta, timezone
from vendorapi.models import DJProduct, DJManufacturer, DJCategory, DJPackageType, DJProductVariation, DJProductStatus, DJParameter, DJStandardPricing, DJProductOtherName
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class DigiKeyAPI:
    token = None
    token_expiry = None

    @classmethod
    def get_access_token(cls):
        if cls.token and cls.token_expiry >datetime.now():
            return cls.token

        data = {
            'client_id': settings.DIGIKEY_CLIENT_ID,
            'client_secret': settings.DIGIKEY_CLIENT_SECRET,
            'grant_type': 'client_credentials'
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        response = requests.post(settings.DIGIKEY_AUTH_URL, data=data, headers=headers)
        response.raise_for_status()
        token_data = response.json()

        cls.token = token_data['access_token']
        cls.token_expiry = datetime.now() + timedelta(seconds=token_data['expires_in'] - 30)
        return cls.token

    @classmethod
    def fetch_product_details(cls, part_number: str):
        token = cls.get_access_token()
        headers = {
            'Authorization': f'Bearer {token}',
            'X-DIGIKEY-Client-Id': settings.DIGIKEY_CLIENT_ID,
            'X-DIGIKEY-Locale-Site': 'US',
            'X-DIGIKEY-Locale-Language': 'en',
            'X-DIGIKEY-Locale-Currency': 'USD',
            'X-DIGIKEY-Customer-Id': '0'
        }

        url = settings.DIGIKEY_PRODUCT_URL.format(digikey_part_number=part_number)
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            logger.info(f"Fetched details for Digi-Key part {part_number}.")
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to fetch details for Digi-Key part {part_number}: {str(e)}")
            raise ValueError(f"Failed to fetch data from Digi-Key: {str(e)}")

    @classmethod
    def get_pricing_and_stock(cls, part_number: str) -> dict:
        """
        Fetch and extract only pricing and stock (prioritized).
        Standard format: {'stock': int, 'variations': list of dicts with 'digikey_pn', 'package_type', 'stock', 'price_breaks'}
        """
        data = cls.fetch_product_details(part_number)
        if not data or 'Product' not in data:
            raise ValueError("No product data returned from Digi-Key")

        product_data = data['Product']
        overall_stock = product_data.get('QuantityAvailable', 0)
        variations = []

        for var_data in product_data.get('ProductVariations', []):
            var_stock = var_data.get('QuantityAvailableforPackageType', 0)
            price_breaks = [
                {
                    'break_quantity': p.get('BreakQuantity', 1),
                    'unit_price': p.get('UnitPrice', 0.0),
                    'total_price': p.get('TotalPrice', 0.0)
                }
                for p in var_data.get('StandardPricing', [])
            ]
            variations.append({
                'digikey_pn': var_data.get('DigiKeyProductNumber', ''),
                'package_type': var_data.get('PackageType', {}).get('Name', ''),
                'stock': var_stock,
                'price_breaks': price_breaks
            })

        return {'stock': overall_stock, 'variations': variations}

    @staticmethod
    def import_product_from_digikey(part_number: str) -> dict:
        data = DigiKeyAPI.fetch_product_details(part_number)
        #print(data)
        if not data or "Product" not in data:
            raise ValueError("No product data returned from Digi-Key")

        product_data = data["Product"]

        # Parse core fields
        manufacturer_name = product_data.get('Manufacturer', {}).get('Name', '')
        manufacturer_product_number = product_data.get("ManufacturerProductNumber")
        product_description = product_data.get("Description", {}).get("ProductDescription", "")
        detailed_description = product_data.get("Description", {}).get("DetailedDescription", "")
        quantity_available = product_data.get("QuantityAvailable", 0)
        product_url = product_data.get("ProductUrl", "")
        datasheet_url = product_data.get("DatasheetUrl", "")
        photo_url = product_data.get("PhotoUrl", "")
        is_obsolete = product_data.get("IsObsolete", False)
        manufacturer_lead_weeks = product_data.get("ManufacturerLeadWeeks", None)
        manufacturer_public_quantity = product_data.get("ManufacturerPublicQuantity", 0)
        standard_package = product_data.get("StandardPackage", 1)
        export_control_class_number = product_data.get("ExportControlClassNumber", "")
        htsus_code = product_data.get("HtsusCode", "")
        moisture_sensitivity_level = product_data.get("MoistureSensitivityLevel", "")
        is_bo_not_allowed = product_data.get("IsBoNotAllowed", False)
        is_ncnr = product_data.get("IsNcnr", False)
        contains_lithium = product_data.get("ContainsLithium", False)
        contains_mercury = product_data.get("ContainsMercury", False)
        is_discontinued = product_data.get("IsDiscontinued", False)
        normally_stocking = product_data.get("NormallyStocking", False)

        try:
            # Check if Manufacturer exists and create if not
            manufacturer, created = DJManufacturer.objects.get_or_create(
                external_id=product_data.get('Manufacturer', {}).get('Id', None),
                name=manufacturer_name
            )
        except Exception as e:
                print("error with MFR")
        try:
            # Handle Categories
            category_data = product_data.get("Categories") or []
            if not category_data:
                single_category = product_data.get("Category")
                if single_category:
                    category_data = [single_category]

            base_category = category_data[0] if category_data else None
            category_obj = None

            if base_category:
                category_level = base_category.get("Level", 0)
                category_obj, _ = DJCategory.objects.get_or_create(
                    category_id=base_category.get("CategoryId"),
                    defaults={
                        "name": base_category.get("Name", ""),
                        "level": category_level
                    }
                )
        except Exception as e:
            print("error with categories")
        try:
            # Product Status
            product_status_data = product_data.get("ProductStatus", {})
            product_status, _ = DJProductStatus.objects.get_or_create(
                status_id=product_status_data.get("Id", None),
                defaults={"status": product_status_data.get("Status", "")}
            )
        except Exception as e:
            print("error with product status")
        # Create or update product
        try:
            product = DJProduct.objects.get(manufacturer_product_number=manufacturer_product_number)
            product.manufacturer = manufacturer
            product.product_description = product_description
            product.detailed_description = detailed_description
            product.quantity_available = quantity_available
            product.product_url = product_url
            product.datasheet_url = datasheet_url
            product.photo_url = photo_url
            product.is_obsolete = is_obsolete
            product.manufacturer_lead_weeks = manufacturer_lead_weeks
            product.manufacturer_public_quantity = manufacturer_public_quantity
            product.standard_package = standard_package
            product.export_control_class_number = export_control_class_number
            product.htsus_code = htsus_code
            product.moisture_sensitivity_level = moisture_sensitivity_level
            product.is_bo_not_allowed = is_bo_not_allowed
            product.is_ncnr = is_ncnr
            product.contains_lithium = contains_lithium
            product.contains_mercury = contains_mercury
            product.is_discontinued = is_discontinued
            product.normally_stocking = normally_stocking
            product.product_status = product_status
            product.save()
        except DJProduct.DoesNotExist:
            product = DJProduct.objects.create(
                manufacturer_product_number=manufacturer_product_number,
                manufacturer=manufacturer,
                product_description=product_description,
                detailed_description=detailed_description,
                quantity_available=quantity_available,
                product_url=product_url,
                datasheet_url=datasheet_url,
                photo_url=photo_url,
                is_obsolete=is_obsolete,
                manufacturer_lead_weeks=manufacturer_lead_weeks,
                manufacturer_public_quantity=manufacturer_public_quantity,
                standard_package=standard_package,
                export_control_class_number=export_control_class_number,
                htsus_code=htsus_code,
                moisture_sensitivity_level=moisture_sensitivity_level,
                is_bo_not_allowed=is_bo_not_allowed,
                is_ncnr=is_ncnr,
                contains_lithium=contains_lithium,
                contains_mercury=contains_mercury,
                is_discontinued=is_discontinued,
                normally_stocking=normally_stocking,
                product_status=product_status,
            )
        
        try:
            if category_obj:
                product.categories.set([category_obj])

            # Variations
            for variation_data in product_data.get("ProductVariations", []):
                package_type_data = variation_data.get("PackageType", {})
                package_type, _ = DJPackageType.objects.get_or_create(
                    external_id=package_type_data.get("Id"),
                    defaults={"name": package_type_data.get("Name", "")}
                )

                variation, _ = DJProductVariation.objects.get_or_create(
                    product=product,
                    digikey_product_number=variation_data.get("DigiKeyProductNumber", ""),
                    defaults={
                        "quantity_available_for_package_type": variation_data.get("QuantityAvailableforPackageType", 0),
                        "minimum_order_quantity": variation_data.get("MinimumOrderQuantity", 1),
                        "max_quantity_for_distribution": variation_data.get("MaxQuantityForDistribution", 0),
                        "package_type": package_type,
                        "marketplace": variation_data.get("MarketPlace", False),
                        "is_tariff_active": variation_data.get("TariffActive", False),
                        "digireeling_fee": variation_data.get("DigiReelFee", 0.0)
                    }
                )

                for pricing_data in variation_data.get("StandardPricing", []):
                    DJStandardPricing.objects.get_or_create(
                        variation=variation,
                        break_quantity=pricing_data.get("BreakQuantity", 1),
                        unit_price=pricing_data.get("UnitPrice", 0.0),
                        total_price=pricing_data.get("TotalPrice", 0.0)
                    )
        except Exception as e:
            print("error with variations")
        # Parameters
        for param_data in product_data.get("Parameters", []):
            DJParameter.objects.get_or_create(
                product=product,
                parameter_text=param_data.get("ParameterText", ""),
                parameter_type=param_data.get("ParameterType", ""),
                value_text=param_data.get("ValueText", ""),
                value_id=param_data.get("ValueId", "")
            )

        # Other Names
        for other_name in product_data.get("OtherNames", []):
            DJProductOtherName.objects.get_or_create(
                product=product,
                name=other_name
            )
        
        #Return custom structure
        response_data = {
            "id": product.id,
            "manufacturer_product_number": product.manufacturer_product_number,
            "description": product.product_description,
            "category": {
                "id": category_obj.category_id,
                "name": category_obj.name,
                "level": category_obj.level
            } if category_obj else None,
            "manufacturer": {
                "id": manufacturer.id,
                "name": manufacturer.name
            },
            "status": product_status.status if product_status else None,

        }
        print(response_data)
        return response_data