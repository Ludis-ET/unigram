from rest_framework import serializers

from .models import UserFile
from post.serializers import TagSerializer
from user.serializers import ProfileDetailSerializer

class FileListSerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True, read_only=True)
    author = ProfileDetailSerializer(many=False, read_only=True)
    class Meta:
        model = UserFile
        fields = ['id','name', 'saves', 'upvotes', 'downvotes', 'downloads', 'tag', 'author', 'file','created_at', 'reports']
    

class FileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFile
        fields = ['id', 'name', 'file', 'tag', 'author']
    

class FileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFile
        fields = ['id', 'upvotes', 'downvotes', 'downloads', 'saves','reports']