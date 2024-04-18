from django.db import models

from django_filters.rest_framework import FilterSet
from django_filters import filters

from .models import Post


class PostFilter(FilterSet):
    save_count__lt = filters.NumberFilter(method='filter_save_count_lt', label="save count less than")
    save_count__gt = filters.NumberFilter(method='filter_save_count_gt', label="save count greator than")
    upvote_count__lt = filters.NumberFilter(method='filter_upvote_count_lt', label="upvote count less than")
    upvote_count__gt = filters.NumberFilter(method='filter_upvote_count_gt', label="upvote count greator than")
    downvote_count__lt = filters.NumberFilter(method='filter_downvote_count_lt', label="downvote count less than")
    downvote_count__gt = filters.NumberFilter(method='filter_downvote_count_gt', label="downvote count greator than")
    class Meta:
        model = Post
        fields = {
            'tags':['exact']
        }
    def filter_save_count_gt(self, queryset, name, value):
        return queryset.annotate(save_count=models.Count('saves')).filter(save_count__gt=value)

    def filter_save_count_lt(self, queryset, name, value):
        return queryset.annotate(save_count=models.Count('saves')).filter(save_count__lt=value)
    
    def filter_upvote_count_gt(self, queryset, name, value):
        return queryset.annotate(save_count=models.Count('upvote')).filter(upvote_count__gt=value)

    def filter_upvote_count_lt(self, queryset, name, value):
        return queryset.annotate(save_count=models.Count('upvote')).filter(upvote_count__lt=value)
    
    def filter_downvote_count_gt(self, queryset, name, value):
        return queryset.annotate(save_count=models.Count('downvote')).filter(upvote_count__gt=value)

    def filter_downvote_count_lt(self, queryset, name, value):
        return queryset.annotate(save_count=models.Count('downvote')).filter(upvote_count__lt=value)
    