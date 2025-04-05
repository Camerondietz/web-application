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
    #path('categories/<int:category_id>/', views.enroll, name='enroll'),
    path('products',views.product_list),
    path('products/<int:product_id>', views.product_detail, name='enroll'),
    path('products/<int:product_id>/', views.product_detail, name='enroll'),
    path('',views.home),
    # Path for registration
    path('register/', views.register_user, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Path for login
    path('login/', views.login_user, name='login'),
    path('login', views.login_user, name='login'),
    # Path for logout
    path('logout/', views.logout_user, name='logout'),
    #path('list/',views.categories)
    path("account/", views.get_account_details, name="account-details"),
    path("account/update/", views.update_account_details, name="account-update"),
    path("account/change-password/", views.change_password, name="account-change-password"),
]
