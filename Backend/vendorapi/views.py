from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from vendorapi.services.digikey_client import DigiKeyAPI
#For adding to DB
from .models import DJProduct, DJManufacturer, DJCategory, DJPackageType, DJProductVariation, DJProductStatus, DJParameter, DJStandardPricing, DJProductOtherName
from django.db import IntegrityError, transaction

class DigiKeyProductView(APIView):
    permission_classes = [AllowAny]  # Adjust if needed (use token auth or IP allowlist for production)

    def get(self, request, *args, **kwargs):
        part_number = request.query_params.get('part_number')
        if not part_number:
            print("error: no part number")
            return JsonResponse({'error': 'Missing part_number'}, status=400)

        data = DigiKeyAPI.fetch_product_details(part_number)

        if data is None:
            print("error: no data returned")
            return JsonResponse({'error': 'Failed to fetch data from Digi-Key'}, status=500)

        # Log/print the JSON to the console
        print(data)

        product_data = data.get('Product', {})
        #Add to DB
        manufacturer_name = product_data.get('Manufacturer', {}).get('Name', '')
        manufacturer_product_number = product_data.get('ManufacturerProductNumber', '')
        product_description = product_data.get('Description', {}).get('ProductDescription', '')
        detailed_description = product_data.get('Description', {}).get('DetailedDescription', '')
        quantity_available = product_data.get('QuantityAvailable', 0)
        product_url = product_data.get('ProductUrl', '')
        datasheet_url = product_data.get('DatasheetUrl', '')
        photo_url = product_data.get('PhotoUrl', '')
        is_discontinued = product_data.get('IsDiscontinued', False)
        normally_stocking = product_data.get('NormallyStocking', False)
        is_obsolete = product_data.get('IsObsolete', False)  # Default to False if 'Obsolete' is missing
        manufacturer_lead_weeks = product_data.get('ManufacturerLeadWeeks', '')
        manufacturer_public_quantity = product_data.get('ManufacturerPublicQuantity', 0)
        is_bo_not_allowed = product_data.get('BackOrderNotAllowed', False)
        is_ncnr = product_data.get('IsNcnr', False)
        export_control_class_number = product_data.get('ExportControlClassNumber', '')
        htsus_code = product_data.get('HtsusCode', '')
        moisture_sensitivity_level = product_data.get('MoistureSensitivityLevel', '')
        contains_lithium = product_data.get('ContainsLithium', False)
        contains_mercury = product_data.get('ContainsMercury', False)
        standard_package = product_data.get('StandardPackage', 0)
        # Handle Foreign Keys first
        try:
            # Check if Manufacturer exists and create if not
            manufacturer, created = DJManufacturer.objects.get_or_create(
                external_id=product_data.get('Manufacturer', {}).get('Id', None),
                name=manufacturer_name
            )

            # Assuming you have a category field in the API response (simplified)
            # Extract the categories list (or fallback to single category)
            category_data = product_data.get('Categories') or []

            if not category_data:
                single_category = product_data.get('Category')
                if single_category:
                    category_data = [single_category]
            # Get `level` and fallback to default (e.g., 0 if missing)
            base_category_data = categories[0]
            
            category_level = base_category_data.get('Level', 0)  # Default to 0 if missing
            
            categories, created = DJCategory.objects.get_or_create(
                category_id=base_category_data.get('CategoryId', None),
                level=category_level,  # Ensure level is not None
                name=base_category_data.get('Name', '')
            )
            
            # Create Product Status (handle nulls if applicable)
            product_status_data = product_data.get('ProductStatus', {})
            product_status, created = DJProductStatus.objects.get_or_create(
                status_id=product_status_data.get('Id', None),
                status=product_status_data.get('Status', '')
            )

            # Create the Product
            try:
                # Attempt to get an existing product based on manufacturer_product_number
                product = DJProduct.objects.get(manufacturer_product_number=manufacturer_product_number)
                # If the product exists, update it
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
                product.categories = categories
                product.product_status = product_status
                #product.last_fetched = timezone.now()
                product.save()
                created = False  # As we just updated the product

            except DJProduct.DoesNotExist:
                # If product doesn't exist, create a new one
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
                    categories = categories,
                    product_status = product_status,
                    #last_fetched=timezone.now(),
                )
                created = True  # A new product was created

            # Handle Product Variations and Pricing
            for variation_data in product_data.get('ProductVariations', []):
                package_type_data = variation_data.get('PackageType', {})
                package_type, created = DJPackageType.objects.get_or_create(
                    external_id=package_type_data.get('Id', None),
                    name=package_type_data.get('Name', '')
                )

                # Add the product variation
                variation, created = DJProductVariation.objects.get_or_create(
                    product=product,
                    digikey_product_number=variation_data.get('DigiKeyProductNumber', ''),
                    quantity_available_for_package_type=variation_data.get('QuantityAvailableforPackageType', 0),
                    minimum_order_quantity=variation_data.get('MinimumOrderQuantity', 1),
                    max_quantity_for_distribution=variation_data.get('MaxQuantityForDistribution', 0),
                    package_type=package_type,
                    marketplace=variation_data.get('MarketPlace', False),
                    is_tariff_active=variation_data.get('TariffActive', False),
                    digireeling_fee=variation_data.get('DigiReelFee', 0.0)
                )

                # Add Standard Pricing for this Variation
                for pricing_data in variation_data.get('StandardPricing', []):
                    DJStandardPricing.objects.get_or_create(
                        variation=variation,
                        break_quantity=pricing_data.get('BreakQuantity', 1),
                        unit_price=pricing_data.get('UnitPrice', 0.0),
                        total_price=pricing_data.get('TotalPrice', 0.0)
                    )

            # Add Parameters to the product
            for param_data in product_data.get('Parameters', []):
                DJParameter.objects.get_or_create(
                    product=product,
                    parameter_text=param_data.get('ParameterText', ''),
                    parameter_type=param_data.get('ParameterType', ''),
                    value_text=param_data.get('ValueText', ''),
                    value_id=param_data.get('ValueId', '')
                )

            # Add Other Names (if any)
            for other_name in product_data.get('OtherNames', []):
                DJProductOtherName.objects.get_or_create(
                    product=product,
                    name=other_name
                )

            # Optionally, print the data to screen (e.g., in a template or console log)
            print(f"Product '{product_description}' added to the database!")

            # Return data to the user (you can adjust this for your needs)
            return JsonResponse({"status": "success", "product_id": product.id, "message": "Product added/updated successfully!"})

        except Exception as e:
            print(str(e))
            # Catch any unexpected errors
            return JsonResponse({"status": "error", "message": f"Unexpected error: {str(e)}"})

class UploadDigiKeyProduct(APIView):
    permission_classes = [AllowAny]  # Adjust if needed (use token auth or IP allowlist for production)

    def get(self, request, *args, **kwargs):     
        part_number = request.query_params.get('part_number')
        if not part_number:
            print("error: no part number")
            return JsonResponse({'error': 'Missing part_number'}, status=400)

        try:
            product_data = DigiKeyAPI.import_product_from_digikey(part_number)
            return JsonResponse(product_data, safe=False)
        except Exception as e:
            print("part retrieval failed")
            return JsonResponse({"error": str(e)}, status=500)
