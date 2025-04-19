from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Post
from .serializers import PostSerializer

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = Post.objects.all()
        if self.action == 'list':
            # For public listing, show only published posts
            if not self.request.user.is_authenticated:
                queryset = queryset.filter(published=True)
        elif self.action == 'user_posts':
            # Show all posts for the authenticated user
            queryset = queryset.filter(author=self.request.user)
        return queryset.order_by('-created_at')

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def user_posts(self, request):
        posts = self.get_queryset()
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data) 