from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Book

@api_view(['GET'])
def book_list(request):
    books = Book.objects.all().values('title', 'author')
    return Response(list(books))
