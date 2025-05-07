from django.http import HttpResponse
from django.shortcuts import render

def homepage(request):
    #return HttpResponse("Hello World")
    return HttpResponse("")

def about(request):
    return HttpResponse("my about page")