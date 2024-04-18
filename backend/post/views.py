from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count,F
from django.shortcuts import get_object_or_404

from rest_framework import status, permissions, viewsets, pagination, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Post, Comment, PostImage, Tag
from .filter import PostFilter
from .serializers import *
from core.models import Hashtag


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.prefetch_related('downvote','upvote','saves','images','comments').select_related('owner').annotate(
    upvote_count=Count('upvote'),
    downvote_count=Count('downvote'), 
    difference=F('upvote_count') - F('downvote_count')
).order_by('-difference','added_time')
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = PostFilter
    search_fields = ['name','description','owner__user__first_name','owner__user__last_name', 'slug']
    ordering_fields = ['upvote','added_time']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        elif self.action == 'create':
            return PostCreationSerializer
        elif self.action == 'retrieve':
            return PostChangeSerializer
        elif self.action == 'update':
            instance = self.get_object()
            if instance.owner == self.request.user.profile:
                return PostUpdateSerializer
            return PostChangeSerializer
        return PostListSerializer
        
    def destroy(self, request, *args, **kwargs):
        me = request.user.profile
        instance = self.get_object()
        if instance.owner == me:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class PostHashtagViewSet(PostViewSet):
    def get_queryset(self):
        hashtag_pk = self.kwargs['hashtag_pk']
        hashtag = get_object_or_404(Hashtag, pk=hashtag_pk)
        
        related_posts = Post.objects.filter(tags__in=hashtag.tags.all()).distinct().prefetch_related('downvote','upvote','saves','images','comments').select_related('owner').annotate(
            upvote_count=Count('upvote'),
            downvote_count=Count('downvote'), 
            difference=F('upvote_count') - F('downvote_count')
        ).order_by('-difference','added_time')

        return related_posts

class NoPagination(pagination.PageNumberPagination):
    page_size = None
class RelatedPostListView(generics.ListAPIView):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ['upvote', 'added_time']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PostListSerializer
    pagination_class = NoPagination

    def get_queryset(self):
        post_id = self.kwargs['post_pk']
        try:
            post = Post.objects.prefetch_related('tags').get(id=post_id)
            tags = post.tags.all()
            related_posts = Post.objects.prefetch_related('downvote','upvote','saves','images','comments').select_related('owner').filter(tags__in=tags).exclude(id=post_id).distinct().annotate(
                upvote_count=Count('upvote'),
                downvote_count=Count('downvote'), 
                difference=F('upvote_count') - F('downvote_count')
            ).order_by('-difference','added_time')
            return related_posts
        except Post.DoesNotExist:
            return Post.objects.none()

class PostImageViewSet(viewsets.ModelViewSet):
    serializer_class = PostImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs.get('post_pk')
        return PostImage.objects.filter(post=post_id)
    
    def create(self, request, *args, **kwargs):
        post_id = kwargs.get('post_pk')
        if request.user.is_authenticated and request.user.profile == Post.objects.get(id=post_id).owner:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def update(self, request, *args, **kwargs):
        post_id = kwargs.get('post_pk')
        if request.user.is_authenticated and request.user.profile == Post.objects.get(id=post_id).owner:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                instance._prefetched_objects_cache = {}

            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def destroy(self, request, *args, **kwargs):
        me = request.user.profile
        instance = self.get_object()
        if instance.post.owner == me:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class CommentListView(generics.ListAPIView):
    serializer_class = CommentListSerializer
    pagination_class = NoPagination

    def get_queryset(self):
        post_pk = self.kwargs.get('post_pk')
        queryset = Comment.objects.prefetch_related('replies').filter(post_id=post_pk, parent_comment=None)
        queryset = queryset.annotate(
                upvote_count=Count('upvote'),
                downvote_count=Count('downvote'), 
                difference=F('upvote_count') - F('downvote_count')
            ).order_by('-difference','-created_at')
        return queryset

class CommentImageViewSet(viewsets.ModelViewSet):
    serializer_class = CommentImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs.get('comment_pk')
        return CommentImage.objects.filter(comment=post_id)
    
    def create(self, request, *args, **kwargs):
        post_id = kwargs.get('comment_pk')
        if request.user.is_authenticated and request.user.profile == Comment.objects.get(id=post_id).author:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def update(self, request, *args, **kwargs):
        post_id = kwargs.get('post_pk')
        if request.user.is_authenticated and request.user.profile == Comment.objects.get(id=post_id).author:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                instance._prefetched_objects_cache = {}

            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def destroy(self, request, *args, **kwargs):
        me = request.user.profile
        instance = self.get_object()
        if instance.comment.author == me:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class CommentCreateAPIView(generics.CreateAPIView):
    serializer_class = CommentCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_pk = self.kwargs.get('post_pk')
        serializer.save(author=self.request.user.profile, post_id=post_pk)


class CommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentListSerializer
    lookup_url_kwarg = 'comment_pk'
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if request.user.profile == instance.author:
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            return Response({"error": "You do not have permission to update this comment."}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.profile == instance.author:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "You do not have permission to delete this comment."}, status=status.HTTP_403_FORBIDDEN)




class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.prefetch_related('hashtags').all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = NoPagination

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user.profile)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.creator != request.user.profile:
            return Response({"error": "You do not have permission to update this tag."}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.creator != request.user.profile:
            return Response({"error": "You do not have permission to delete this tag."}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)