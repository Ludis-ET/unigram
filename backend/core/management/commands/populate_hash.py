from django.core.management.base import BaseCommand
from core.models import Hashtag, Organization
from user.models import Profile  # Replace 'your_app' with the name of your Django app
from django.utils.text import slugify
import random

departments = [
    "Software",
    "Electrical",
    "Medicine",
    "Mechanical",
    "Civil",
    "Chemical",
    "Computer Science",
    "Biomedical",
    "Agricultural",
    "Sociology",
    "Economics",
]

class Command(BaseCommand):
    help = 'Populates the Hashtag model with department names and assigns them to organizations'

    def handle(self, *args, **options):
        Hashtag.objects.all().delete()  # Clear existing hashtags
        organizations = Organization.objects.all()
        profiles = Profile.objects.all()
        for department_name in departments:
            for organization in random.sample(list(organizations), random.randint(1, min(len(organizations), 5))):
                slug = slugify(f"{department_name}")[:50]  # Truncate slug if it exceeds 50 characters
                hashtag, created = Hashtag.objects.get_or_create(name=department_name, slug=slug)
                hashtag.organization.add(organization)
                if created:
                    self.stdout.write(self.style.SUCCESS(f'Successfully created hashtag "{hashtag.name}" for organization "{organization.name}"'))
                # Assign up to 5 random profiles to each hashtag
                subscribers = random.sample(list(profiles), min(len(profiles), 5))
                hashtag.subscribers.add(*subscribers)
                self.stdout.write(self.style.SUCCESS(f'Successfully assigned subscribers to hashtag "{hashtag.name}"'))
        self.stdout.write(self.style.SUCCESS('Successfully populated Hashtag model with department names and assigned them to organizations'))