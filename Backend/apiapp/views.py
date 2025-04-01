from django.http import HttpResponse,JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q

#from django.views.decorators.csrf import csrf_protect

def home(request):
     return HttpResponse("Hello")

def get_subcategories(category_id):
    """ Recursively get all subcategories for a given category ID """
    subcategories = Category.objects.filter(parent_category_id=category_id)
    subcategory_ids = list(subcategories.values_list('id', flat=True))

    for subcategory in subcategories:
        subcategory_ids.extend(get_subcategories(subcategory.id))

    return subcategory_ids

#not currently used
@api_view(['GET', 'POST'])
def categories(request):
    #list all categories
    #return HttpResponse("categories")
    if request.method == 'GET':
        categoriesAll = Category.objects.all()
        serializer = CategorySerializer(categoriesAll, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    #Add Category
    if request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET'])
def category_list(request):
    parent_id = request.GET.get('parent')
    if parent_id:
        categories = Category.objects.filter(parent_category_id=parent_id)
    else:
        categories = Category.objects.filter(parent_category__isnull=True)
    data = [
        {
            "id": cat.id,
            "name": cat.name,
            "parent_category": cat.parent_category.id if cat.parent_category else None,
            "has_subcategories": cat.subcategories.exists()  # Check if it has children
        }
        for cat in categories
    ]
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def product_detail(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    serializer = ProductSerializer(product)  # 'many=True' for a single object
    return JsonResponse(serializer.data, safe=False)
    
@api_view(['GET'])
def product_list(request):
    category_id = request.GET.get('category')
    keyword = request.GET.get('keyword')
    page = int(request.GET.get('page', 1))
    page_size = 12  # Number of products per page

    # Start with all products
    products = Product.objects.all()

    # Filter by category (including subcategories recursively)
    if category_id:
        try:
            category_ids = [int(category_id)]  # Include the main category
            category_ids.extend(get_subcategories(category_id))  # Add subcategories
            products = products.filter(category_id__in=category_ids)
        except Category.DoesNotExist:
            return JsonResponse({'error': 'Category not found'}, status=404)

    # Filter by keyword (searching in name and description)
    if keyword:
        products = products.filter(
            Q(name__icontains=keyword) | Q(description__icontains=keyword)
        )

    # Apply Pagination
    paginator = Paginator(products, page_size)
    paginated_products = paginator.get_page(page)

    # Serialize response
    serializer = ProductSerializer(paginated_products, many=True)
    return JsonResponse({
        "products": serializer.data,
        "has_next_page": paginated_products.has_next()
    }, safe=False)
        
#`login_user` view to handle sign-in requests
@api_view(['POST'])
def login_user(request):
    """User Login API"""
    username = request.data.get('username')
    password = request.data.get('password')
    print("Login attempt",username,password)
    
    if username is None or password is None:
        return Response({"error": "Missing credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


#`logout_request` view to handle sign-out requests
#@csrf_protect
@api_view(['POST'])
def logout_user(request):
    """User Logout API - Blacklists the refresh token"""
    try:
        refresh_token = request.data.get("refresh")
        print(refresh_token)
        if not refresh_token:
            return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
        print("Token mpresent")
        # Attempt to parse and validate the refresh token
        try:
            token = RefreshToken(refresh_token)
        except Exception as e:
            print(f"Error occurred: {str(e)}")
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        print("token created")

        # Blacklist the token if valid
        try:
            token.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(f"Error occurred: {str(e)}")
            return Response({"error": "Logout unsuccessful"}, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


#`registration` view to handle sign-up requests
@api_view(['POST'])
def register_user(request):
    """User Registration API"""
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "User registered successfully",
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)
