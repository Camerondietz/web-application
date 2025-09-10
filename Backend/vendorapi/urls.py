from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('prices/', views.PricesView.as_view()),  #/?product_ids=45,3
    path('product-details/', views.ProductDetailsView.as_view()), #/?product_id=45
    
    #path('DJ/getproduct/<String:pk>',views.get_dj_product),
    #path('digikey/', DigiKeyProductView.as_view(), name='digikey-product'),
    #path('digikey/upload/', UploadDigiKeyProduct.as_view(), name='digikey-upload'),
    #path('manufacturers',views.manufacturer_list),
    #path('categories/<int:category_id>/', views.enroll, name='enroll'),



]