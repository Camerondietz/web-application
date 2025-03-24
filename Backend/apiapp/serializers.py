from rest_framework import serializers
from .models import Category,User
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'description', 'parent_category']
