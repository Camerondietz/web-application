from rest_framework import serializers
from .models import Category, Product, Address

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name', 'description', 'parent_category']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # category is serialized object returned
    price = serializers.FloatField()
    class Meta:
        model = Product
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'street2', 'city', 'state', 'zip_code', 'country', 'name', 'is_default']
        read_only_fields = ['id']
