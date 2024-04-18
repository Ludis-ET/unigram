from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from user.models import Point, Notification
from .models import Report

@receiver(post_save, sender=Report)
def handle_report_approval(sender, instance, created, **kwargs):
    if not created and instance.approve:
        message = f"Your report regarding {instance.reported_content_type.model} has been approved. You have been rewarded 50 points."
        Notification.objects.create(user_profile=instance.person, message=message)

        Point.objects.create(user_profile=instance.person, value=50, reason='Report Approval')