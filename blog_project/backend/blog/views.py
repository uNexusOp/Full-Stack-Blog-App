from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from .models import Post
from .serializers import PostSerializer
from .permissions import IsAuthorOrReadOnly

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = Post.objects.all()
        if self.action == 'list':
            # For public listing, show all posts
            return queryset.order_by('-created_at')
        elif self.action == 'user_posts':
            # Show only user's posts
            return queryset.filter(author=self.request.user).order_by('-created_at')
        return queryset

class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)
