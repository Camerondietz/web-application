from django.contrib import admin
from .models import Address, Category, Product, Manufacturer, Order, OrderItem, Payment, Supplier, ProductSupplier

#admin.site.register(User)
admin.site.register(Category)
admin.site.register(Address)
admin.site.register(Product)
admin.site.register(Manufacturer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(Supplier)
admin.site.register(ProductSupplier)