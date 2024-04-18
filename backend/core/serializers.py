from rest_framework import serializers
from .models import Organization, Hashtag, Report
from post.serializers import TagSerializer

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'


class HashtagSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True, many=True)
    tags = TagSerializer(read_only=True, many=True)
    class Meta:
        model = Hashtag
        fields = ['id', 'name', 'organization', 'slug', 'tags', 'subscribers']




class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'