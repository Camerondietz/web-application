import os
from django.http import HttpResponse,JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Category, Product, Manufacturer, Order, OrderItem, Address, HomepageConfig
from .serializers import CategorySerializer, ProductSerializer, AddressSerializer
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
from django.views.decorators.csrf import csrf_exempt
from decimal import Decimal
import traceback
import stripe
import json
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.template.loader import render_to_string

#from django.views.decorators.csrf import csrf_protect
from .services.ERP_services import process_checkout_session, ShipAddress, get_orders_for_user, get_order_details

@api_view(['GET'])
def homepage_featured(request):
    config = HomepageConfig.objects.first()  # Assuming there's only one config instance
    if not config:
        return JsonResponse({
            'categories': [],
            'products': [],
            'manufacturers': []
        })

    # Fetch featured categories (only visible ones)
    categories = Category.objects.filter(id__in=config.featured_category_ids)
    cat_data = [
        {
            'id': cat.id,
            'name': cat.name,
            'image': cat.image.url if cat.image else None
        } for cat in categories
    ]

    # Fetch featured products (assuming Product has name and image fields)
    products = Product.objects.filter(id__in=config.featured_product_ids)
    prod_data = [
        {
            'id': prod.id,
            'name': prod.name,
            'image': prod.image.url if prod.image else None  # Adjust if your Product model has a different image field
        } for prod in products
    ]

    # Fetch featured manufacturers
    manufacturers = Manufacturer.objects.filter(id__in=config.featured_manufacturer_ids)
    mfr_data = [
        {
            'id': man.id,
            'name': man.name,
            'website': man.website,
            'image': man.image.url if man.image else None
        } for man in manufacturers
    ]

    return JsonResponse({
        'categories': cat_data,
        'products': prod_data,
        'manufacturers': mfr_data
    })

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

#------------------------------
#         AUTH
#------------------------------
#Request Reset Password
@api_view(['POST'])
def forgot_password(request):
    """Send password reset link"""
    email = request.data.get("email")
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        # Don't reveal if the email exists (security best practice)
        return Response({"message": "If this email exists, a reset link has been sent."}, status=status.HTTP_200_OK)

    # Generate uid and token
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

    # Send email
    subject = "Password Reset Request"
    message = f"Hi {user.username},\n\nClick the link below to reset your password:\n{reset_link}\n\nIf you did not request this, please ignore."
    
    send_mail(subject, message, None, [user.email])

    return Response({"message": "If this email exists, a reset link has been sent."}, status=status.HTTP_200_OK)
#Reset Password
@api_view(['POST'])
def reset_password(request, uidb64, token):
    """Reset password using token from email"""
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({"error": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST)

    if not default_token_generator.check_token(user, token):
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

    new_password = request.data.get("password")
    if not new_password:
        return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
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
    
@api_view(['POST'])
def refresh_token(request):
    """Token Refresh API"""
    refresh_token = request.data.get("refresh")

    if not refresh_token:
        return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Validate the refresh token
        refresh = RefreshToken(refresh_token)

        # Generate a new access token
        access_token = str(refresh.access_token)

        return Response({
            "access": access_token,
            "refresh": refresh_token,  # Optionally return the same refresh token
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error occurred while refreshing token: {str(e)}")
        return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_400_BAD_REQUEST)

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

#------------------------------
#         ACCOUNT
#------------------------------
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
#------------------------------
#         Address
#------------------------------
# Get Account Addresses
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_account_addresses(request):
    """Retrieve addresses associated with the authenticated user."""
    user = request.user  # Get the authenticated user
    
    # Fetch addresses for the current user
    addresses = Address.objects.filter(user=user)
    
    # Serialize the address data
    serialized_addresses = AddressSerializer(addresses, many=True)
    
    # Return the serialized data as a response
    return Response(serialized_addresses.data, status=200)

# Add Account Address
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_account_addresses(request):
    """Add a new address for the authenticated user."""
    user = request.user  # Get the authenticated user
    data = request.data.copy()
    data['user'] = user.id  # Ensure the address is linked to the authenticated user

    serializer = AddressSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Edit Address
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_account_address(request, pk):
    address = get_object_or_404(Address, pk=pk, user=request.user)
    serializer = AddressSerializer(address, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account_address(request, pk):
    try:
        address = get_object_or_404(Address, pk=pk, user=request.user)
        
        # Optional: Prevent deleting the last remaining address
        if Address.objects.filter(user=request.user).count() == 1:
            return Response(
                {"detail": "Cannot delete the only address."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Optional: Prevent deleting default address unless another one exists
        if address.is_default:
            other_addresses = Address.objects.filter(user=request.user).exclude(pk=pk)
            if other_addresses.exists():
                # Set another address as default before deleting
                fallback = other_addresses.first()
                fallback.is_default = True
                fallback.save()
            else:
                return Response(
                    {"detail": "Cannot delete the default address without another to replace it."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    except Exception as e:
        return Response(
            {"detail": f"Error deleting address: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Set Address default
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_default_address(request, pk):
    Address.objects.filter(user=request.user).update(is_default=False)
    address = get_object_or_404(Address, pk=pk, user=request.user)
    address.is_default = True
    address.save()
    return Response({'status': 'default set'})

#------------------------------
#         ORDERS
#------------------------------
# Get Account Orders
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_account_orders(request):
    """Retrieve ERPNext orders for the authenticated user."""
    print(request.user)
    user = request.user
    try:
        orders = get_orders_for_user(user)
        return Response(orders, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_order_details_view(request, order_name):
    """Retrieve details and line items for a specific order from ERPNext."""
    print(order_name)
    try:
        order = get_order_details(order_name)
        
        if not order:
            return Response({"error": "Order not found"}, status=404)
        
                # Extracting general order information
        order_data = {
            "order_name": order.get("name"),
            "creation": order.get("creation"),
            "transaction_date": order.get("transaction_date"),
            "delivery_date": order.get("delivery_date"),
            "currency": order.get("currency"),
            "grand_total": order.get("grand_total"),
            "taxes_and_charges": order.get("taxes_and_charges"),
            "status": order.get("status"),
            "delivery_status": order.get("delivery_status"),
            "customer": order.get("customer"),
            #"customer_address": order.get("customer_address"),
            #"contact_email": order.get("contact_email"),
            "total_net_weight": order.get("total_net_weight"),
            "base_total": order.get("base_total"),
            "total_taxes_and_charges": order.get("total_taxes_and_charges"),
        }

        # Extracting line items (order items)
        items_data = []
        items = order.get("items", [])
        for item in items:
            item_details = {
                "item_name": item.get("item_name"),
                "item_code": item.get("item_code"),
                "qty": item.get("qty"),
                "rate": item.get("rate"),
                "amount": item.get("amount"),
            }
            items_data.append(item_details)

        # Combine all the data into the final response
        response_data = {
            "order_details": order_data,
            "items": items_data,
        }

        return Response(response_data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
#------------------------------
#         CHECKOUT
#------------------------------
stripe.api_key = settings.STRIPE_SECRET_KEY
print(stripe.api_key)
#stripe.api_version = '2025-03-31.basil'

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_address(request):
    data = json.loads(request.body)
    address = data.get("address")
    request.session["ship_address"] = address
    #shipping_rates = get_ups_shipping_rates(address, cart_info["weight_kg"])
    #request.session["shipping_rates"] = shipping_rates
    #return JsonResponse({"rates": shipping_rates})
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
    if not request.user.is_authenticated:
        print("not authenticated")
        #return Response({"error": "User not authenticated"}, status=401)
    user = request.user
    try:
        #Checking cart data
        data = request.data
        cart_items = data.get('cartItems', [])

        # Check if cart_items is None or empty
        if not cart_items:
            return Response({
                "error": "Cart is empty or not provided."
            }, status=400)
        
        validated_items = []
        line_items = []
        total_price = Decimal('0.00')

        for item in cart_items:
            print(item['id'])
            product = get_object_or_404(Product, pk=item['id'])
            print(product)

            quantity = int(item['quantity'])
            if quantity <= 0 or product.price <= 0:
                return Response({
                    "error": f"Invalid item: {product.name} (Qty: {quantity}, Price: {product.price})"
                }, status=400)

            line_total = product.price * quantity
            print("part price:", line_total)
            total_price += line_total
            print("total price:", total_price)

            validated_items.append({
                "id": product.id,
                "name": product.name,
                "quantity": quantity,
                "price": str(product.price),
            })

            #Adding to order will go here
            # Append individual line item
            line_items.append({
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": product.name,
                    },
                    "unit_amount": int(product.price * 100),  # Stripe expects cents
                },
                "quantity": quantity,
            })

        print("line_items:", line_items)
        print("customer_email:", request.user.email)
        print("user_id:", request.user.id)
        # Create Stripe checkout session
        session = stripe.checkout.Session.create(
            ui_mode = 'custom',
            line_items=line_items,
            mode='payment',
            billing_address_collection='auto',
            shipping_address_collection={
              'allowed_countries': ['US'],
            },
            metadata={
                "user_id": str(user.id),
            },
            customer_email=user.email,
            automatic_tax={'enabled': True},
            return_url=settings.FRONTEND_URL + '/checkout/return?session_id={CHECKOUT_SESSION_ID}',
        )
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    return Response({
        "clientSecret":session.client_secret,
        'cart':validated_items
        })

@api_view(['GET'])
def session_status(request):
  sessionID = request.GET.get('session_id')
  session = stripe.checkout.Session.retrieve(sessionID)
  return Response(session)
  #return Response({"status": session.status, "customer_email":session.customer_details.email})
  #return jsonify(status=session.status, payment_status=session.payment_status, payment_intent_id=session.payment_intent.id, payment_intent_status=session.payment_intent.status)
@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    endpoint_secret = settings.STRIPE_SIGNED_KEY

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    # Raw print of event dictionary
    print("Webhook event received:")
    #print(event)

    # Handle completed checkout
    if event['type'] == 'checkout.session.completed':
        print(event)
        session = event['data']['object']
        session_id = session['id']
        metadata = session.get('metadata', {})
        try:
            total_order_price = Decimal(session['amount_total']) / 100
            user_id = metadata.get("user_id")
            user = User.objects.get(id=user_id) if user_id else None
            customer_email = session.get("customer_details", {}).get("email")
            session_status = session.get("status")
            stripe_line_items = stripe.checkout.Session.list_line_items(session_id)

            if session_status == "complete":
                order_status = "Processing"
            elif session_status == "expired":
                order_status = "Cancelled"
            else:
                order_status = "Pending"

            collected = session.get('collected_information') or {}
            shipping_details = collected.get('shipping_details') or {}
            shipping = shipping_details.get('address') or {}

            # Fallback to customer_details.address if empty
            if not shipping:
                shipping = session.get("customer_details", {}).get("address", {}) or {}

            ship_addr = ShipAddress(
                line1=shipping.get('line1', ''),
                line2=shipping.get('line2', ''),
                city=shipping.get('city', ''),
                state=shipping.get('state', ''),
                postal_code=shipping.get('postal_code', ''),
                country=shipping.get('country', ''),
            )
            order_shipping_street = shipping.get('line1', '')
            order_shipping_street2 = shipping.get('line2', '')
            order_shipping_city = shipping.get('city', '')
            order_shipping_state = shipping.get('state', '')
            order_shipping_zip = shipping.get('postal_code', '')
            order_shipping_country = shipping.get('country', '')
            try:
                result = process_checkout_session(
                    session=session,
                    cart_items=stripe_line_items,
                    shipping=ship_addr,
                    full_name=session.get('customer_details', {}).get('name'),
                    currency=(session.get('currency') or 'usd').upper(),
                )
                print('ERPNext sync result:', result)
            except Exception as e:
                print('Webhook processing failed:', e)
            try:
                #existing order
                order = Order.objects.get(stripe_session_id=session_id)
                order.status = 'paid'
                order.email = customer_email
                order.save()

            except Order.DoesNotExist:
                # Fallback if no order pre-created
                order = Order.objects.create(
                    user=user,
                    email=customer_email,
                    status=order_status,
                    stripe_session_id=session_id,
                    total_price=total_order_price,
                    shipping_street=order_shipping_street,
                    shipping_street2=order_shipping_street2,
                    shipping_city=order_shipping_city,
                    shipping_state=order_shipping_state,
                    shipping_zip_code=order_shipping_zip,
                    shipping_country=order_shipping_country,

                )
                print(stripe_line_items)
                for item in stripe_line_items['data']:
                    product_id = item['description']
                    quantity = item.get('quantity', 1)
                    amount_total = Decimal(item.get('amount_total', 0)) / 100

                    product = Product.objects.filter(name=product_id).first()

                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        product_name=product.name if product else item['description'],
                        quantity=quantity,
                        price=amount_total,
                    )

        except Exception as e:
            print(f"Webhook error: {e}")
            traceback.print_exc()
            return HttpResponse(status=500)

    return HttpResponse(status=200)

def send_order_confirmation(order, user):
    subject = f"Order Confirmation #{order.id}"
    message = render_to_string("emails/order_confirmation.txt", {"order": order, "user": user})
    html_message = render_to_string("emails/order_confirmation.html", {"order": order, "user": user})

    send_mail(
        subject,
        message,
        None,  # will use DEFAULT_FROM_EMAIL
        [user.email],
        html_message=html_message,
    )

### UPS ###
from .services.ups_service import get_shipping_rates
@api_view(['GET'])
def UPS_rates(request):
    #destination_zip = request.GET.get("zip")
    #rates = get_shipping_rates(destination_zip)
    destination_zip = "78738"
    weight_lbs = 5
    rates = get_shipping_rates(destination_zip, weight_lbs)
    print(rates)
    return JsonResponse(rates, safe=False)