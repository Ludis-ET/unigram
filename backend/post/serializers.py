from django.db.models import Count

from rest_framework import serializers

from .models import Post, PostImage, Comment, CommentImage, Tag
from user.models import Profile,User

class userSer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username','email']

class AuthorIdentitySerializer(serializers.ModelSerializer):
    user = userSer(many=False, read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'user', 'profile_pic', 'bio', 'verified_org', 'total_upvotes', 'total_downvotes', 'total_points']


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'


class CommentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentImage
        fields = '__all__'


class CommentListSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    comment_images = CommentImageSerializer(many=True, read_only=True)
    author = AuthorIdentitySerializer(many=False, read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'comment_images', 'created_at','upvote', 'downvote', 'replies']

    def get_replies(self, obj):
        replies = obj.replies.annotate(upvote_count=Count('upvote')).order_by('-upvote_count')
        serializer = self.__class__(replies, many=True, context=self.context)
        return serializer.data
    
class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['parent_comment', 'content',]
    
class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]

class PostListSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments_count = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    tags = TagsSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'owner', 'name', 'slug', 'video', 'images', 'description', 'comments_count', 'tags', 'saves','upvote', 'downvote', 'added_time', 'updated_time', 'reports']

    def get_comments_count(self, obj):
        return self.count_comments(obj)

    def count_comments(self, obj):
        main_comments = Comment.objects.filter(post=obj, parent_comment=None)
        count = main_comments.count()
        return count

    def get_owner(self, obj):
        profile = obj.owner
        return {
            'id': profile.id,
            'username': profile.user.username,
            'verified':profile.verified_org,
            'first_name':profile.user.first_name,
            'last_name':profile.user.last_name,
            'profile_pic': profile.profile_pic.url if profile.profile_pic else None,
        }


class PostCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','owner','name', 'video', 'description', 'tags']

        
class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['name', 'video', 'description', 'tags', 'reports']

class PostChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['saves', 'upvote', 'downvote']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name",'hashtags']