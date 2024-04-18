from django.db import models
from django.utils.text import slugify

from user.models import Profile
from core.models import Hashtag

class Tag(models.Model):
    name = models.CharField(max_length=256)
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='tags', null=True)
    hashtags = models.ManyToManyField(Hashtag, related_name='tags', blank=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, related_name='posts')
    name = models.CharField(max_length=900)
    slug = models.SlugField(unique=True, blank=True)
    video = models.FileField(upload_to='posts/videos/', blank=True, null=True)
    description = models.TextField()
    saves = models.ManyToManyField(Profile, related_name='saved_posts', blank=True)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)
    upvote = models.ManyToManyField(Profile, related_name='upvoted_posts', blank=True)
    downvote = models.ManyToManyField(Profile, related_name='downvoted_posts', blank=True)
    added_time = models.DateTimeField(auto_now_add=True)
    reports = models.ManyToManyField(Profile, blank=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name[:30]} by {self.owner.user.username}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if not self._state.adding and self.__class__.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            counter = 1
            original_slug = self.slug
            while self.__class__.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1
        self.owner.update()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.owner.update()
        super().delete(*args, **kwargs)

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    images = models.ImageField(upload_to='files/images/')
    added_time = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE, null=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE,null=True, related_name='my_comments')
    content = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey('self', related_name='replies', on_delete=models.CASCADE, null=True, blank=True)
    upvote = models.ManyToManyField(Profile, related_name='upvoted_comment', blank=True)
    downvote = models.ManyToManyField(Profile, related_name='downvoted_comment', blank=True)

    def __str__(self):
        if self.parent_comment:
            return "reply for [{}]".format(self.parent_comment)
        if self.post:
            return f"Comment on '{self.post.name}' by {self.author.user.username} (ID: {self.id})"
        
    def save(self, *args, **kwargs):
        self.author.save()
        super().save(*args, **kwargs)
        

    def delete(self, *args, **kwargs):
        self.author.save()
        super().delete(*args, **kwargs)

class CommentImage(models.Model):
    comment_image = models.ImageField(upload_to='files/comment_images/')
    added_time = models.DateTimeField(auto_now_add=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_images')


