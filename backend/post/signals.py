from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from user.models import Notification
from post.models import Post, Comment

@receiver(post_save, sender=Post)
def handle_post_creation(sender, instance, created, **kwargs):
    if created:
        instance.owner.points.create(value=10, reason='Post Creation')
        Notification.objects.create(
            user_profile=instance.owner,
            message=f'You earned 10 points for creating the post "{instance.name}".',
            sender_profile=None,
            following=False
        )

@receiver(post_save, sender=Comment)
def handle_comment_creation(sender, instance, created, **kwargs):
    if created:
        instance.author.points.create(value=5, reason='Comment Creation')
        Notification.objects.create(
            user_profile=instance.author,
            message=f'You earned 5 points for commenting on the post "{instance.post.name}".',
            sender_profile=None,
            following=False
        )

@receiver(m2m_changed, sender=Post.saves.through)
def handle_post_save(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        instance.owner.points.create(value=2, reason='Post Saved')
        Notification.objects.create(
            user_profile=instance.owner,
            message=f'Your post was saved by someone.',
            sender_profile=None,
            following=False
        )

@receiver(m2m_changed, sender=Post.upvote.through)
def handle_post_upvote(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        instance.owner.points.create(value=1, reason='Post Upvoted')
        Notification.objects.create(
            user_profile=instance.owner,
            message=f'Your post "{instance.name}" was upvoted by someone.',
            sender_profile=None,
            following=False
        )

@receiver(m2m_changed, sender=Post.downvote.through)
def handle_post_downvote(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        instance.owner.points.create(value=-1, reason='Post Downvoted')
        Notification.objects.create(
            user_profile=instance.owner,
            message=f'Your post "{instance.name}" was downvoted by someone.',
            sender_profile=None,
            following=False
        )

@receiver(m2m_changed, sender=Comment.upvote.through)
def handle_comment_upvote(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        instance.author.points.create(value=1, reason='Comment Upvoted')
        Notification.objects.create(
            user_profile=instance.author,
            message=f'Your comment on "{instance.post.name}" was upvoted by someone.',
            sender_profile=None,
            following=False
        )

@receiver(m2m_changed, sender=Comment.downvote.through)
def handle_comment_downvote(sender, instance, action, model, pk_set, **kwargs):
    if action == 'post_add':
        instance.author.points.create(value=-1, reason='Comment Downvoted')
        Notification.objects.create(
            user_profile=instance.author,
            message=f'Your comment on "{instance.post.name}" was downvoted by someone.',
            sender_profile=None,
            following=False
        )
