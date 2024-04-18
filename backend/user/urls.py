from django.urls import path
from rest_framework_nested import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'profiles', ProfileViewSet)

profile_router = routers.NestedDefaultRouter(router, r'profiles', lookup='profile')
profile_router.register(r'notifications', NotificationViewSet, basename='profile-notification')
profile_router.register(r'saved-files', SavedFilesViewSet, basename='profile-saved-files')
profile_router.register(r'files', MyFilesViewSet, basename='profile-files')
profile_router.register(r'saved-posts', SavedPostsViewSet, basename='profile-saved-posts')
profile_router.register(r'posts', PostViewSet, basename='profile-post')
profile_router.register(r'badges', BadgeViewSet, basename='profile-badge')

urlpatterns = router.urls + profile_router.urls

urlpatterns += [
    path('profiles/<int:profile_pk>/comments/', CommentViewSet.as_view(), name='comment-list'),
    path('profile/<int:user_pk>/', MyProfileViewSet.as_view(),),
]
