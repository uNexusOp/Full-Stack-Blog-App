from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author', 'content', 
                 'created_at', 'updated_at', 'published')
        read_only_fields = ('slug', 'created_at', 'updated_at') 