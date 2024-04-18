from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'hashtags', HashtagViewSet, basename='hashtags')


urlpatterns = router.urls

urlpatterns += [
    path('reports/', ReportCreateAPIView.as_view())
]