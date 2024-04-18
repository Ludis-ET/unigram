from django.urls import path

from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'tags', TagViewSet)

posts_router = NestedDefaultRouter(router, r'posts', lookup='post')
posts_router.register(r'images', PostImageViewSet, basename='post-images')

urlpatterns = router.urls + posts_router.urls

urlpatterns += [
    path('posts/hashtag/<int:hashtag_pk>/', PostHashtagViewSet.as_view({'get': 'list'}), name='hashtag-list'),
    path('posts/<int:post_pk>/comments/', CommentListView.as_view(), name='comment-list'),
    path('posts/<int:post_pk>/related/', RelatedPostListView.as_view(), name='comment-list'),
    path('posts/<int:post_pk>/comments/create/', CommentCreateAPIView.as_view(), name='comment-create'),
    path('posts/<int:post_pk>/comments/<int:comment_pk>/get/', CommentRetrieveUpdateDestroyAPIView.as_view(), name='comment-create'),
    path('posts/<int:post_pk>/comments/<int:comment_pk>/images/', CommentImageViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('posts/<int:post_pk>/comments/<int:comment_pk>/images/<int:pk>/', CommentImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
]