import sys
from django.utils.timezone import now
try:
    from django.db import models
except Exception:
    print("There was an error loading django modules. Do you have django installed?")
    sys.exit()

from django.conf import settings
import uuid



class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    image = models.ImageField(upload_to='products/')
    created_at = models.DateTimeField(auto_now_add=True)

# ===========================
# Public-Facing Web Database
# ===========================

# User & Authentication
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password_hash = models.TextField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    is_default = models.BooleanField(default=False)

# Product & Categories
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    image_url = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class ProductReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review_text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

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

# Shipping & Customer Support
class Shipping(models.Model):
    STATUS_CHOICES = [
        ('Shipped', 'Shipped'),
        ('In Transit', 'In Transit'),
        ('Delivered', 'Delivered'),
        ('Returned', 'Returned'),
    ]
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    tracking_number = models.CharField(max_length=50, unique=True)
    carrier = models.CharField(max_length=100)
    estimated_delivery = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Shipped')

class CustomerSupportTicket(models.Model):
    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('Pending', 'Pending'),
        ('Closed', 'Closed'),
    ]
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Open')
    created_at = models.DateTimeField(auto_now_add=True)

# ===========================
# Internal ERP Database
# ===========================

# Suppliers & Inventory
class Supplier(models.Model):
    name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

class Inventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    warehouse_location = models.CharField(max_length=255)
    stock = models.PositiveIntegerField()

# Purchase Orders & Supplier Invoices
class PurchaseOrder(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

class PurchaseOrderItem(models.Model):
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)

class SupplierInvoice(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateTimeField()
    paid = models.BooleanField(default=False)

# Accounting & Finance
class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('Revenue', 'Revenue'),
        ('Expense', 'Expense'),
    ]
    type = models.CharField(max_length=50, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class TaxRecord(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2)

# Reporting & Analytics
class SalesReport(models.Model):
    date = models.DateField()
    total_sales = models.DecimalField(max_digits=10, decimal_places=2)
    total_orders = models.PositiveIntegerField()

class InventoryReport(models.Model):
    date = models.DateField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    stock_level = models.PositiveIntegerField()
