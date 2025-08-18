# vendors/models.py

from django.db import models

class DJManufacturer(models.Model):
    external_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class DJCategory(models.Model):
    category_id = models.IntegerField()
    level = models.IntegerField()
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        unique_together = ('category_id', 'level')

    def __str__(self):
        return self.name

class DJPackageType(models.Model):
    external_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class DJProductStatus(models.Model):
    status_id = models.IntegerField()
    status = models.CharField(max_length=50)

class DJProduct(models.Model):
    manufacturer_product_number = models.CharField(max_length=100, unique=True)
    manufacturer = models.ForeignKey(DJManufacturer, on_delete=models.CASCADE)
    product_description = models.CharField(max_length=255)
    detailed_description = models.TextField(blank=True, null=True)
    quantity_available = models.IntegerField(blank=True, null=True)
    product_url = models.URLField(blank=True, null=True)
    datasheet_url = models.URLField(blank=True, null=True)
    photo_url = models.URLField(blank=True, null=True)
    is_discontinued = models.BooleanField(blank=True, null=True)
    normally_stocking = models.BooleanField(blank=True, null=True)
    is_obsolete = models.BooleanField(blank=True, null=True)
    manufacturer_lead_weeks = models.CharField(max_length=10, blank=True, null=True)
    manufacturer_public_quantity = models.IntegerField()
    standard_package = models.IntegerField(blank=True, null=True)
    export_control_class_number = models.CharField(max_length=20, blank=True, null=True)
    htsus_code = models.CharField(max_length=20, blank=True, null=True)
    moisture_sensitivity_level = models.CharField(max_length=50, blank=True, null=True)
    is_bo_not_allowed = models.BooleanField(blank=True, null=True)
    is_ncnr = models.BooleanField(blank=True, null=True)
    contains_lithium = models.BooleanField(blank=True, null=True)
    contains_mercury = models.BooleanField(blank=True, null=True)
    product_status = models.ForeignKey(DJProductStatus, on_delete=models.SET_NULL, null=True)
    is_end_of_life = models.BooleanField(blank=True, null=True)
    categories = models.ManyToManyField(DJCategory)
    #my categories
    last_fetched = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.manufacturer_product_number
    
# Parameters Model (to store product parameters like voltage, frequency, etc.)
class DJParameter(models.Model):
    product = models.ForeignKey(DJProduct, on_delete=models.CASCADE)
    parameter_text = models.CharField(max_length=255)
    parameter_type = models.CharField(max_length=50)
    value_text = models.CharField(max_length=255)
    value_id = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.parameter_text}: {self.value_text}"

class DJProductOtherName(models.Model):
    product = models.ForeignKey(DJProduct, on_delete=models.CASCADE, related_name='other_names')
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class DJProductVariation(models.Model):
    product = models.ForeignKey(DJProduct, on_delete=models.CASCADE, related_name='variations')
    digikey_product_number = models.CharField(max_length=100, unique=True)
    quantity_available_for_package_type = models.IntegerField()
    minimum_order_quantity = models.IntegerField()
    max_quantity_for_distribution = models.IntegerField(blank=True, null=True)
    package_type = models.ForeignKey(DJPackageType, on_delete=models.SET_NULL, null=True)
    marketplace = models.BooleanField()
    is_tariff_active = models.BooleanField()
    digireeling_fee = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.digikey_product_number

class DJStandardPricing(models.Model):
    variation = models.ForeignKey(DJProductVariation, on_delete=models.CASCADE, related_name='standard_pricing')
    break_quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=5)
    total_price = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"{self.break_quantity} @ {self.unit_price}"