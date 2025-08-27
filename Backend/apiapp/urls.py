"""
URL configuration for webproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('categories',views.category_list),
    path('manufacturers',views.manufacturer_list),
    #path('categories/<int:category_id>/', views.enroll, name='enroll'),
    path('products',views.product_list),
    path('products/<int:product_id>', views.product_detail),
    path('products/<int:product_id>/', views.product_detail),
    path('',views.home),

    ### AUTH ###
    # Path for registration
    path('register/', views.register_user, name='register'),
    #path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/refresh/', views.refresh_token, name='token_refresh'),
    path('auth/', views.get_auth_details),
    # Path for login
    path('login/', views.login_user, name='login'),
    path('login', views.login_user, name='login'),
    # Path for logout
    path('logout/', views.logout_user, name='logout'),
    #path('list/',views.categories)
    path("account/", views.get_account_details, name="account-details"),
    path("account/update/", views.update_account_details, name="account-update"),
    path("account/change-password/", views.change_password, name="account-change-password"),

    ### ADDRESS ###
    # List all addresses for authenticated user
    path('account/addresses/', views.get_account_addresses, name='get_account_addresses'),
    # Add new address
    path('account/addresses/add/', views.add_account_addresses, name='add_account_addresses'),
    # Update address by ID
    path('account/addresses/<int:pk>/', views.update_account_address, name='update_account_address'),
    # Delete address by ID
    path('account/addresses/delete/<int:pk>/', views.delete_account_address, name='delete_account_address'),
    # Set address as default
    path('account/addresses/<int:pk>/set-default/', views.set_default_address, name='set_default_address'),

    ### Orders ###
    # List all orders for authenticated user
    path('account/orders/', views.get_account_orders, name='get_account_orders'),
    # List Order details for authenticated user
    path('account/order/<str:order_name>/', views.get_order_details_view, name='get_account_order'),

    ### STRIPE ###
    path('submit-address', views.submit_address),
    path('create-checkout-session', views.create_checkout_session),
    #path('create-checkout-session/', views.create_checkout_session),
    path('session-status', views.session_status),
    path('webhook', views.stripe_webhook),
    #path('session-status/', views.create_checkout_session),

    ### UPS ###
    path('get_shipping_rates', views.UPS_rates),

    #path('webhook', views.webhook),
    #path('webhook/', views.webhook),
    #path('create-payment-intent', views.create_payment_intent),
    #path('create-payment-intent/', views.create_payment_intent),
    #path('get-config', views.get_config),
    #path('get-config/', views.get_config),


]
