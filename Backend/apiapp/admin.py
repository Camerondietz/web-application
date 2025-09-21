from django.contrib import admin
from django.forms import Textarea
from .models import Address, Category, CategoryAttribute, Product, Manufacturer, Order, OrderItem, Payment, Supplier, ProductSupplier, EtimClass, EtimGroup, EtimFeature, HomepageConfig, ProductPrice

#admin.site.register(User)
admin.site.register(Category)
admin.site.register(CategoryAttribute)

admin.site.register(Address)
admin.site.register(Product)
admin.site.register(Manufacturer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(Supplier)
admin.site.register(ProductSupplier)

admin.site.register(EtimClass)
admin.site.register(EtimGroup)
admin.site.register(EtimFeature)

class ProductPriceAdmin(admin.ModelAdmin):
    list_display = ['product', 'sell_price', 'valid_until', 'method', 'is_automatic']
    list_filter = ['is_automatic', 'is_discountable']
    search_fields = ['product__name']


class HomepageConfigAdmin(admin.ModelAdmin):
    list_display = ['__str__']
    search_fields = ['updated_at']

    # You can specify how the array fields are displayed in the admin list
    def featured_product_ids_display(self, obj):
        return ', '.join(map(str, obj.featured_product_ids))

    def featured_category_ids_display(self, obj):
        return ', '.join(map(str, obj.featured_category_ids))

    def featured_manufacturer_ids_display(self, obj):
        return ', '.join(map(str, obj.featured_manufacturer_ids))

    list_display += [
        'featured_product_ids_display', 
        'featured_category_ids_display', 
        'featured_manufacturer_ids_display'
    ]
    

admin.site.register(HomepageConfig, HomepageConfigAdmin)
admin.site.register(ProductPrice, ProductPriceAdmin)