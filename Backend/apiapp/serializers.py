from rest_framework import serializers
from .models import Category, Product

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
