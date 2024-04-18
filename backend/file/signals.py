from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from .models import UserFile
from user.models import Point, Notification

@receiver(post_save, sender=UserFile)
def handle_userfile_creation(sender, instance, created, **kwargs):
    if created:
        message = f"Your file '{instance.name}' has been successfully uploaded."
        Notification.objects.create(user_profile=instance.author, message=message)
        Point.objects.create(user_profile=instance.author, value=10, reason='File Uploaded')

@receiver(m2m_changed, sender=UserFile.upvotes.through)
def handle_userfile_upvote(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        upvoter_profiles = instance.upvotes.filter(pk__in=pk_set)
        for upvoter_profile in upvoter_profiles:
            message = f"You upvoted the file '{instance.name}'."
            Notification.objects.create(user_profile=upvoter_profile, message=message)
            Point.objects.create(user_profile=upvoter_profile, value=2, reason='File Upvoted')

@receiver(m2m_changed, sender=UserFile.downvotes.through)
def handle_userfile_downvote(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        downvoter_profiles = instance.downvotes.filter(pk__in=pk_set)
        for downvoter_profile in downvoter_profiles:
            message = f"You downvoted the file '{instance.name}'."
            Notification.objects.create(user_profile=downvoter_profile, message=message)
            Point.objects.create(user_profile=downvoter_profile, value=-2, reason='File Downvoted')

@receiver(m2m_changed, sender=UserFile.saves.through)
def handle_userfile_save(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        saver_profiles = instance.saves.filter(pk__in=pk_set)
        for saver_profile in saver_profiles:
            message = f"You saved the file '{instance.name}'."
            Notification.objects.create(user_profile=saver_profile, message=message)
            Point.objects.create(user_profile=saver_profile, value=5, reason='File Saved')

@receiver(m2m_changed, sender=UserFile.downloads.through)
def handle_userfile_download(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        downloader_profiles = instance.downloads.filter(pk__in=pk_set)
        for downloader_profile in downloader_profiles:
            message = f"You downloaded the file '{instance.name}'."
            Notification.objects.create(user_profile=downloader_profile, message=message)
            Point.objects.create(user_profile=downloader_profile, value=1, reason='File Downloaded')
