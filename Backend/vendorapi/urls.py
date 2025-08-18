from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from .views import DigiKeyProductView, UploadDigiKeyProduct

urlpatterns = [
    #path('DJ/getproduct/<String:pk>',views.get_dj_product),
    path('digikey/', DigiKeyProductView.as_view(), name='digikey-product'),
    path('digikey/upload/', UploadDigiKeyProduct.as_view(), name='digikey-upload'),
    #path('manufacturers',views.manufacturer_list),
    #path('categories/<int:category_id>/', views.enroll, name='enroll'),



]