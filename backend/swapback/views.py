from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import api_view, permission_classes
from .models import User, Item, Like, Comment, Chat, Message, Interest
from .serializers import UserSerializer, ItemSerializer, LikeSerializer, CommentSerializer, ChatSerializer, MessageSerializer,InterestSerializer

#Import section on top of views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import status
from .serializers import RegisterSerializer



class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class InterestViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.parsers import MultiPartParser, FormParser

@api_view(['POST'])

def upload_item(request):
    data = request.data.copy()  # Make mutable
    data['user'] = request.user.id  # Attach the user ID to the data

    serializer = ItemSerializer(data=data)

    if serializer.is_valid():
        serializer.save(user=request.user)  # Important: assign user object here
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_item(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    like, created = Like.objects.get_or_create(user=request.user, item=item)
    if created:
        return Response({'status': 'liked'})
    return Response({'status': 'already liked'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unlike_item(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    Like.objects.filter(user=request.user, item=item).delete()
    return Response({'status': 'unliked'})

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        item_id = self.kwargs['item_id']
        return Comment.objects.filter(item__id=item_id).order_by('-created_at')

    def perform_create(self, serializer):
        item_id = self.kwargs['item_id']
        serializer.save(user=self.request.user, item_id=item_id)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request, item_id):
    item = Item.objects.get(pk=item_id)
    content = request.data.get('content')
    if not content:
        return Response({"error": "Empty comment"}, status=400)
    Comment.objects.create(user=request.user, item=item, content=content)
    return Response({"message": "Comment added"}, status=201)



class UserItemsViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(user=self.request.user)  # Filter items by logged-in user