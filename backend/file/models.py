from django.db import models

from user.models import Profile
from post.models import Tag

# Create your models here.

class UserFile(models.Model):
    name = models.CharField(max_length=500)
    file = models.FileField(upload_to='user/files/', blank=True)
    tag = models.ManyToManyField(Tag, related_name='tagged_files')
    author = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name='my_files')
    upvotes = models.ManyToManyField(Profile, related_name='upvoted_files', blank=True)
    downvotes = models.ManyToManyField(Profile, related_name='downvoted_files', blank=True)
    saves = models.ManyToManyField(Profile, related_name='saved_files', blank=True)
    downloads = models.ManyToManyField(Profile, related_name='downloaded_files', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True) 
    reports = models.ManyToManyField(Profile, blank=True)

    def __str__(self):
        return self.name
    