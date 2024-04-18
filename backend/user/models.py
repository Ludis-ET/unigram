from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


user_model = settings.AUTH_USER_MODEL

class User(AbstractUser):
    email = models.EmailField(unique = True, blank = False)
    first_name = models.CharField(max_length=255,blank = False)
    last_name = models.CharField(max_length=255,blank = False)

    REQUIRED_FIELDS = ['first_name','last_name','email',]


class Profile(models.Model):
    user = models.OneToOneField(user_model,on_delete = models.CASCADE, related_name='profile')
    profile_pic = models.ImageField(upload_to='user/profile',blank=True)
    bio = models.TextField(null=True,blank=True)
    org_email = models.EmailField(blank=True)
    verified_org = models.BooleanField(default = False)
    total_upvotes = models.IntegerField(default=0)
    total_downvotes = models.IntegerField(default=0)
    total_points = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}'s profile"

    def update_vote_counts(self):
        self.total_upvotes = self.posts.aggregate(upvote_count=models.Count('upvote'))['upvote_count'] or 0
        self.total_downvotes = self.posts.aggregate(downvote_count=models.Count('downvote'))['downvote_count'] or 0
        self.total_upvotes += self.my_comments.aggregate(upvote_count=models.Count('upvote'))['upvote_count'] or 0
        self.total_downvotes += self.my_comments.aggregate(downvote_count=models.Count('downvote'))['downvote_count'] or 0

    def update_total_points(self):
        self.total_points = self.points.aggregate(total_points=models.Sum('value'))['total_points'] or 0

    def update(self, *args, **kwargs):
        self.update_vote_counts()
        self.update_total_points()
        super().save(*args, **kwargs)


class Badge(models.Model):
    badge_name = models.CharField(max_length=200)
    badge_image = models.ImageField(upload_to='user/badge')
    badge_description = models.TextField(max_length=500)

    def __str__(self):
        return self.badge_name

class UserBadge(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='badges')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE, related_name='users')

    def __str__(self):
        return f"{self.user.user.username}'s {self.badge.badge_name} badge"


class Point(models.Model):
    user_profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='points')
    value = models.IntegerField()
    reason = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_profile.user.username} - {self.value} points - {self.reason}"
    
    def save(self, *args, **kwargs):
        self.user_profile.update()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.user_profile.update()
        super().delete(*args, **kwargs)
    

class Notification(models.Model):
    user_profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    sender_profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_notifications', null=True)
    following = models.BooleanField(default=False)
    answer = models.ForeignKey('post.Comment', on_delete=models.CASCADE, related_name='answer_notifications', null=True)

    def __str__(self):
        return self.message


