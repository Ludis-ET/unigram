from rest_framework.routers import DefaultRouter

from .views import FileListView

router = DefaultRouter()
router.register(r'files', FileListView)

urlpatterns = router.urls
