import sys
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator
try:
    from django.db import models
except Exception:
    print("There was an error loading django modules. Do you have django installed?")
    sys.exit()

from django.conf import settings
import uuid

# ===========================
# Public-Facing Web Database
# ===========================

# User & Authentication  - deprecated
#class User(models.Model):
#    first_name = models.CharField(max_length=100)
#    last_name = models.CharField(max_length=100)
#    email = models.EmailField(unique=True)
#    password_hash = models.TextField()
#    phone = models.CharField(max_length=20, blank=True, null=True)
#    created_at = models.DateTimeField(auto_now_add=True)
#    def __str__(self):
#        return self.first_name

#Addresses    
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    street = models.CharField(max_length=255)
    street2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    name = models.CharField(max_length=50, null=True, blank=True)
    is_default = models.BooleanField(default=False)

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    parent_category = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='subcategories')
    is_visible = models.BooleanField(default=False, blank=False, null=False)
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)
    margin = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # e.g., 20.00 for 20% margin
    def __str__(self):
        return self.name
    class Meta:
        indexes = [
            models.Index(fields=['parent_category']),
            models.Index(fields=['is_visible']),
        ]
    
    @property
    def is_visible_with_children(self):
        # Check if this category or any of its parents are visible
        if self.is_visible:
            return True
        elif self.parent_category:
            return self.parent_category.is_visible_with_children
        return False
    
class CategoryAttribute(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='attributes')
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}: {self.value}"
    
# MFR Model
class Manufacturer(models.Model):
    name = models.CharField(max_length=255, unique=True)
    website = models.URLField(blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='manufacturer_images/', blank=True, null=True)
    def __str__(self):
        return self.name
    
class HomepageConfig(models.Model):
    featured_product_ids = ArrayField(models.IntegerField(), blank=True, default=list)
    featured_category_ids = ArrayField(models.IntegerField(), blank=True, default=list)
    featured_manufacturer_ids = ArrayField(models.IntegerField(), blank=True, default=list)
updated_at = models.DateTimeField(auto_now=True)
def __str__(self):
        return "Homepage Configuration"
class Meta:
        verbose_name = "Homepage Configuration"
        verbose_name_plural = "Homepage Configuration"


#Product Model
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Base retail price TO BE DEPRECATED
    stock = models.PositiveIntegerField() #To be deprecated
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    manufacturer = models.ForeignKey('Manufacturer', null=True, blank=True, on_delete=models.SET_NULL)
    suppliers = models.ManyToManyField('Supplier', through='ProductSupplier')
    created_at = models.DateTimeField(auto_now_add=True)
    is_visible = models.BinaryField(blank=True, null=True, default=False)
    is_auto = models.BinaryField(blank=True, null=True, default=False) #To be deprecated?
    weight = models.PositiveIntegerField(null=True, blank=True, help_text="Weight in Lbs")


    def __str__(self):
        return self.name
    
    class Meta:
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['category']),
            models.Index(fields=['is_visible']),
        ]

class ProductPrice(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='prices')
    sell_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    valid_until = models.DateTimeField(null=True, blank=True)
    method = models.CharField(max_length=50, null=True, blank=True)  # e.g., 'automatic', 'manual'
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    is_automatic = models.BooleanField(default=False, null=True, blank=True)  # Auto-fetch if True
    custom_margin = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # e.g., 25.00 for 25%
    is_discountable = models.BooleanField(default=True, null=True, blank=True)  # Eligible for user discounts
    def __str__(self):
        return f"{self.product.name} - ${self.sell_price}"
    class Meta:
        indexes = [
            models.Index(fields=['product', 'valid_until']),
        ]

class QuoteRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processed', 'Processed'),
        ('rejected', 'Rejected'),
    )

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    product = models.ForeignKey('Product', on_delete=models.SET_NULL, null=True, blank=True)
    custom_pn = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = "Quote Request"
        verbose_name_plural = "Quote Requests"

    def __str__(self):
        return f"Quote Request #{self.id} - {self.name}"
    
class ContactUs(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Quote Request #{self.name} - {self.created_at}"
# Orders & Payments
class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    stripe_session_id = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=50, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    # Snapshotted address fields
    shipping_title = models.CharField(max_length=255, blank=True, null=True)
    shipping_street = models.CharField(max_length=255, blank=True, null=True)
    shipping_street2 = models.CharField(max_length=255, blank=True, null=True)
    shipping_city = models.CharField(max_length=100, blank=True, null=True)
    shipping_state = models.CharField(max_length=50, blank=True, null=True)
    shipping_zip_code = models.CharField(max_length=20, blank=True, null=True)
    shipping_country = models.CharField(max_length=50, blank=True, null=True)
    def __str__(self):
        return f"Order #{self.id} - {self.email or 'Guest'} - {self.status} - ${self.total_price}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    product_name = models.CharField(max_length=50, null=True)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f"{self.product_name or self.product} x {self.quantity} (Order #{self.order.id})"
    
class Payment(models.Model):
    PAYMENT_METHODS = [
        ('Credit Card', 'Credit Card'),
        ('PayPal', 'PayPal'),
        ('Crypto', 'Crypto'),
        ('Bank Transfer', 'Bank Transfer'),
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed'),
    ]
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHODS)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

#Supplier Model
class Supplier(models.Model):
    name = models.CharField(max_length=255, unique=True)
    contact_email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class ProductSupplier(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    supplier = models.ForeignKey('Supplier', on_delete=models.CASCADE)
    supplier_sku = models.CharField(max_length=100, blank=True, null=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    min_order_qty = models.PositiveIntegerField(default=1)
    lead_time_days = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        unique_together = ('product', 'supplier')

    def __str__(self):
        return f"{self.product.name} from {self.supplier.name}"

# -----------------------
# ETIM Core Tables
# -----------------------

class EtimGroup(models.Model):
    code = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.code} - {self.name}"


class EtimClass(models.Model):
    code = models.CharField(max_length=80, primary_key=True)  # e.g., EC000000
    name = models.CharField(max_length=255)
    group = models.ForeignKey(EtimGroup, on_delete=models.CASCADE, related_name='classes')
    version = models.CharField(max_length=80, null=True, blank=True)
    version_date = models.CharField(max_length=80, null=True, blank=True)

    def __str__(self):
        return f"{self.code} - {self.name}"


class EtimFeature(models.Model):
    code = models.CharField(max_length=80, primary_key=True)  # e.g., EF000001
    name = models.CharField(max_length=255)
    group = models.ForeignKey('EtimFeatureGroup', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.code} - {self.name}"


class EtimFeatureGroup(models.Model):
    code = models.CharField(max_length=80, primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.code} - {self.name}"


class EtimUnit(models.Model):
    code = models.CharField(max_length=80, primary_key=True)
    symbol = models.CharField(max_length=80)

    def __str__(self):
        return self.name


class EtimValue(models.Model):
    code = models.CharField(max_length=80, primary_key=True)
    value = models.CharField(max_length=255)

    def __str__(self):
        return self.value


# -----------------------
# Mapping Tables
# -----------------------

class EtimClassFeatureMap(models.Model):
    artclassfeaturenr = models.BigIntegerField(primary_key=True)
    etim_class = models.ForeignKey('EtimClass', on_delete=models.CASCADE)
    feature = models.ForeignKey('EtimFeature', on_delete=models.CASCADE)
    
    FEATURE_TYPE_CHOICES = [
        ('A', 'Alphanumeric'),
        ('N', 'Numeric'),
        ('F', 'Float'),
        ('B', 'Boolean'),
        ('E', 'Enumeration'),  # Add others based on ETIM spec if needed
    ]
    feature_type = models.CharField(max_length=15, choices=FEATURE_TYPE_CHOICES)
    
    unit = models.ForeignKey('EtimUnit', null=True, blank=True, on_delete=models.SET_NULL)
    sort_number = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('etim_class', 'feature')


class EtimClassFeatureValueMap(models.Model):
    artclassfeaturevaluenr = models.BigIntegerField(primary_key=True)
    feature_map = models.ForeignKey('EtimClassFeatureMap', on_delete=models.CASCADE, related_name='value_maps')
    value = models.ForeignKey('EtimValue', on_delete=models.CASCADE)
    sort_number = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('feature_map', 'value')


class EtimClassSynonym(models.Model):
    etim_class = models.ForeignKey(EtimClass, on_delete=models.CASCADE)
    synonym = models.CharField(max_length=255)

    def __str__(self):
        return self.synonym