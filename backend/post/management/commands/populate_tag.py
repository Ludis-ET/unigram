from django.core.management.base import BaseCommand
from post.models import Tag
from core.models import Hashtag
from user.models import  Profile  # Replace 'your_app' with the name of your Django app
import random

tags_data = [
    "Introduction to Programming",
    "Data Structures",
    "Algorithms",
    "Object-Oriented Programming",
    "Web Development",
    "Database Management",
    "Software Engineering",
    "Computer Networks",
    "Operating Systems",
    "Machine Learning",
    "Artificial Intelligence",
    "Cybersecurity",
    "Mobile App Development",
    "UI/UX Design Principles",
    "Wireframing",
    "Prototyping",
    "User Testing",
    "Design Thinking",
    "Agile UX",
    "Lean UX",
    "Responsive Web Design",
    "Mobile UI Design",
    "Brand Identity Design",
    "Typography",
    "Color Theory",
    "Logo Design",
    "Illustration",
]

class Command(BaseCommand):
    help = 'Populates the Tag model with tag names and connects them with hashtags'

    def handle(self, *args, **options):
        Tag.objects.all().delete()  # Clear existing tags
        hashtags = Hashtag.objects.all()
        ludis_profile = Profile.objects.get(user__username='ludis')
        for tag_name in tags_data:
            tag = Tag.objects.create(name=tag_name, creator=ludis_profile)
            tag_hashtags = random.sample(list(hashtags), random.randint(1, min(len(hashtags), 5)))
            tag.hashtags.add(*tag_hashtags)
            self.stdout.write(self.style.SUCCESS(f'Successfully created tag "{tag.name}"'))
            self.stdout.write(self.style.SUCCESS(f'Successfully connected tag "{tag.name}" with hashtags'))
        self.stdout.write(self.style.SUCCESS('Successfully populated Tag model with tag names and connected them with hashtags'))
