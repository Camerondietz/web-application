from django.http import HttpResponse,JsonResponse
from django.shortcuts import render
from .models import Category
from .serializers import CategorySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

def home(request):
     return HttpResponse("Hello")

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
        
#`login_user` view to handle sign-in requests
@api_view(['POST'])
def login_user(request):
    """User Login API"""
    username = request.data.get('username')
    password = request.data.get('password')

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
@api_view(['POST'])
def logout_user(request):
    """User Logout API - Blacklists the refresh token"""
    try:
        refresh_token = request.data.get("refresh")
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
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
