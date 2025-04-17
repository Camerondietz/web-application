import sys
from django.utils.timezone import now
from django.contrib.auth.models import User

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

# User & Authentication
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
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    is_default = models.BooleanField(default=False)

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    parent_category = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='subcategories')
    def __str__(self):
        return self.name
    
# MFR Model
class Manufacturer(models.Model):
    name = models.CharField(max_length=255, unique=True)
    website = models.URLField(blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

#Product Model
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # retail price
    stock = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    manufacturer = models.ForeignKey('Manufacturer', null=True, blank=True, on_delete=models.SET_NULL)
    suppliers = models.ManyToManyField('Supplier', through='ProductSupplier')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


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
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

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
