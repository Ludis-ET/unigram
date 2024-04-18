from django.db import models
from django.utils.text import slugify
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from user.models import Profile

class Organization(models.Model):
    name= models.CharField(unique=True, max_length=200)
    logo=models.ImageField(upload_to="organization/logo/")
    student_email = models.CharField(max_length=50,null=True)
    address=models.TextField()

    def __str__(self):
        return self.name


class Hashtag(models.Model):
    name = models.CharField(max_length=200)
    organization = models.ManyToManyField(Organization, related_name="hashtags")
    subscribers = models.ManyToManyField(Profile, related_name="subscribed_hashtags", blank=True)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return f'#{self.slug}'

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Hashtag.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Report(models.Model):
    reported_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    reported_object_id = models.PositiveIntegerField(null=True)
    reported_post = GenericForeignKey('reported_content_type', 'reported_object_id')
    person = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name='reports')
    description = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    approve = models.BooleanField(default=False)

    def __str__(self):
        return f"Reported {self.reported_content_type.model} at {self.time}"