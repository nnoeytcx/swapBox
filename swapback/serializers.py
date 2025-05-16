
from django.contrib.auth import get_user_model

from rest_framework import serializers
from .models import User, Item, Like, Comment, Interest, Chat, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'avatar', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # or use a nested serializer

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at']

class ItemSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    like_count = serializers.IntegerField(source='likes.count', read_only=True)
    liked = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True, source='comment_set', default=[])
    owner = serializers.PrimaryKeyRelatedField(read_only=True)


    class Meta:
        model = Item
        fields = ['id', 'title', 'swap', 'owner', 'description', 'status', 'image', 'user', 'image_url', 'like_count', 'liked', 'comments']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None
    def get_like_count(self, obj):
        return obj.likes.count()
    def get_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            print(f"Checking like for user: {request.user} and item: {obj.id}")
            return obj.likes.filter(user=request.user).exists()
        return False
    
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'item', 'created_at']

class InterestSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True) 
    
    class Meta:
        model = Interest
        fields = ['id', 'user', 'item', 'created_at']

class ChatSerializer(serializers.ModelSerializer):
    user1 = UserSerializer()
    user2 = UserSerializer()
    item = ItemSerializer()

    class Meta:
        model = Chat
        fields = ['id', 'user1', 'user2', 'item', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'chat', 'sender', 'sender_username', 'content', 'created_at']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user