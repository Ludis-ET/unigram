import django_filters
from django.db.models import Count, F
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, permissions, response, status
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import UserFile
from .serializers import *


class UserFileFilter(django_filters.FilterSet):
    class Meta:
        model = UserFile
        fields = {
            'tag':['exact']
        }

class FileListView(viewsets.ModelViewSet):
    queryset = UserFile.objects.prefetch_related('saves','downloads','tag','upvotes','downvotes').annotate(
        upvote_count=Count('upvotes'),
        downvote_count=Count('downvotes'), 
        difference=F('upvote_count') - F('downvote_count')
    ).order_by('-difference','created_at')
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = UserFileFilter
    search_fields = ['name','author__user__first_name','author__user__last_name']
    ordering_fields = ['upvote','added_time']

    def get_serializer_class(self):
        if self.action == 'list':
            return FileListSerializer
        elif self.action == 'create':
            return FileCreateSerializer
        elif self.action == 'update':
            instance = self.get_object()
            if instance.author == self.request.user.profile:
                return FileCreateSerializer
            return FileUpdateSerializer
        return FileListSerializer
    
    def destroy(self, request, *args, **kwargs):
        me = request.user.profile
        instance = self.get_object()
        if instance.author == me:
            self.perform_destroy(instance)
            return response.Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return response.Response(status=status.HTTP_401_UNAUTHORIZED)

        