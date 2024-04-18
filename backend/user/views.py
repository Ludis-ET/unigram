from django.shortcuts import get_object_or_404
from django.db.models import F

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from post.models import Post, Comment
from post.views import PostViewSet as BasePostViewset, CommentListView as BaseCommentListView
from .models import *
from .serializers import *

from file.serializers import FileListSerializer
from post.serializers import PostListSerializer
from file.models import UserFile


class NoPagination(PageNumberPagination):
    page_size = None

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.prefetch_related('subscribed_hashtags').select_related('user').all().order_by(-(F('total_upvotes') - F('total_downvotes')))
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = NoPagination



    def get_serializer_class(self):
        if self.action == 'list':
            return ProfileListSerializer
        elif self.action == 'create':
            return ProfileListSerializer
        elif self.action == 'retrieve' or self.action == 'update':
            return ProfileDetailSerializer
        return ProfileListSerializer
    
class MyProfileViewSet(generics.RetrieveAPIView):
    serializer_class = ProfileDetailSerializer
    
    def retrieve(self, request, *args, **kwargs):
        user_pk = self.kwargs.get('user_pk')
        profile = get_object_or_404(Profile.objects.prefetch_related('subscribed_hashtags').select_related('user'), user=user_pk)
        if request.user.is_authenticated and request.user.profile == profile:
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class PostViewSet(BasePostViewset):
    def get_queryset(self):
        profile_pk = self.kwargs.get('profile_pk')
        queryset = Post.objects.prefetch_related('downvote','upvote','saves','images','comments').select_related('owner').filter(owner=profile_pk)
        return queryset


class CommentViewSet(BaseCommentListView):
    def get_queryset(self):
        post_pk = self.kwargs.get('profile_pk')
        queryset = Comment.objects.prefetch_related('replies').filter(post_id=post_pk, parent_comment=None)
        return queryset


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = NoPagination

    def get_queryset(self):
        profile_pk = self.kwargs.get('profile_pk')
        queryset = Notification.objects.filter(user_profile=profile_pk).order_by('-timestamp')
        return queryset


class BadgeViewSet(viewsets.ModelViewSet):
    serializer_class = UserBadgeSerializer
    pagination_class = NoPagination

    def get_queryset(self):
        profile_pk = self.kwargs.get('profile_pk')
        queryset = Point.objects.filter(user_profile=profile_pk)
        return queryset

class SavedFilesViewSet(viewsets.ModelViewSet):
    serializer_class = FileListSerializer

    def get_queryset(self):
        profile_pk = self.kwargs.get('profile_pk')
        queryset = UserFile.objects.filter(saves__in=profile_pk)
        return queryset
    
class MyFilesViewSet(viewsets.ModelViewSet):
    serializer_class = FileListSerializer

    def get_queryset(self):
        profile_pk = self.kwargs.get('profile_pk')
        queryset = UserFile.objects.filter(author=profile_pk)
        return queryset

class SavedPostsViewSet(viewsets.ModelViewSet):
    serializer_class = PostListSerializer

    def get_queryset(self):
        profile_pk = self.kwargs.get('profile_pk')
        queryset = Post.objects.filter(saves__in=profile_pk)
        return queryset


