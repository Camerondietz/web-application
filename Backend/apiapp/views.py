import os
from django.http import HttpResponse,JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Category, Product, Manufacturer
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth import authenticate
from django.db.models import Q
from django.conf import settings
from decimal import Decimal
import stripe

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
    # Handle 'null' or empty parent_id as root categories
    if not parent_id or parent_id == 'null':
        categories = Category.objects.filter(parent_category__isnull=True)
    else:
        categories = Category.objects.filter(parent_category_id=parent_id)
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

#Get manufacturers
@api_view(['GET'])
def manufacturer_list(request):
    manufacturers = Manufacturer.objects.all()
    data = [
        {
            "id": man.id,
            "name": man.name,
        }
        for man in manufacturers
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
    manufacturer_id = request.GET.get('manufacturer')
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
    #Filter by manufacturer
    if manufacturer_id:
        products = products.filter(manufacturer_id=manufacturer_id)

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_auth_details(request):
    """Returns basic info of the authenticated user"""
    user = request.user
    return Response({
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "username": user.username,
    }, status=status.HTTP_200_OK)

#`logout_request` view to handle sign-out requests
#@csrf_protect
@api_view(['POST'])
@permission_classes([IsAuthenticated])
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

# GET Account Details
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_account_details(request):
    """Retrieve user account details."""
    user = request.user  # Authenticated user
    return Response({
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "phone": user.profile.phone if hasattr(user, "profile") else "",
    }, status=status.HTTP_200_OK)


# UPDATE Account Details
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_account_details(request):
    """Update user account details."""
    user = request.user  # Authenticated user
    data = request.data

    user.first_name = data.get("first_name", user.first_name)
    user.last_name = data.get("last_name", user.last_name)
    user.email = data.get("email", user.email)
    
    # Optional: Update phone if using a custom user profile model
    if hasattr(user, "profile"):
        user.profile.phone = data.get("phone", user.profile.phone)
        user.profile.save()

    user.save()
    return Response({"message": "Account updated successfully"}, status=status.HTTP_200_OK)


# CHANGE PASSWORD
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Allow users to change their password after verifying their current password."""
    user = request.user
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")
    confirm_password = request.data.get("confirm_password")

    if not user.check_password(current_password):
        return Response({"error": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

    if new_password != confirm_password:
        return Response({"error": "New passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

    user.password = make_password(new_password)
    user.save()
    
    return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)

#payment handeling
stripe.api_key = settings.STRIPE_SECRET_KEY
print(stripe.api_key)
#stripe.api_version = '2025-03-31.basil'

@api_view(['POST'])
def create_checkout_session(request):
    try:
        #Checking cart data
        data = request.data
        cart_items = data.get('cartItems', [])
        price = 0
        totalPrice = Decimal('0.00')
        for item in cart_items:
            print(item['id'])
            product = get_object_or_404(Product, pk=item['id'])
            print(product)
            quantity = int(item['quantity'])
            price = product.price * quantity  # product.price is a Decimal
            print("part price:", price)
            totalPrice += price
            print("total price:", totalPrice)


        session = stripe.checkout.Session.create(
            ui_mode = 'embedded',
            line_items=[
                {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "One-time Payment"},
                    "unit_amount": int(totalPrice * 100),
                },
                "quantity": 1,
                },
            ],
            mode='payment',
            return_url=settings.FRONTEND_URL + '/checkout/return?session_id={CHECKOUT_SESSION_ID}',
        )
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    return Response({"clientSecret":session.client_secret})

@api_view(['GET'])
def session_status(request):
  sessionID = request.GET.get('session_id')
  session = stripe.checkout.Session.retrieve(sessionID)

  return Response({"status": session.status, "customer_email":session.customer_details.email})
