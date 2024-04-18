from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from user.models import Profile 
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates profiles for existing users'
    Profile.objects.all().delete()

    def handle(self, *args, **options):
        users = User.objects.all()
        for user in users:
            # Create a Profile instance for each user
            profile_pic = f'user/profile/idata.jpg'  # Example path for profile picture
            bio = 'Random bio text'  # Example bio text
            Profile.objects.create(user=user, profile_pic=profile_pic, bio=bio)
        self.stdout.write(self.style.SUCCESS('Successfully created profiles for all users'))
