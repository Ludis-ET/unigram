from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User

from .models import Profile, Notification, Point

@receiver(post_save, sender=Profile)
def create_profile_notification_and_points(sender, instance, created, **kwargs):
    if created:
        welcome_message = "Welcome to our platform! You've earned 100 points as a welcome gift."
        Notification.objects.create(user_profile=instance, message=welcome_message)
        
        Point.objects.create(user_profile=instance, value=100, reason="Welcome bonus")

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
