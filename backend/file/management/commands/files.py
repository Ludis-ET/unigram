import random
from django.core.management.base import BaseCommand
from file.models import UserFile
from user.models import Profile
from post.models import Tag  # Import the necessary models from your app

class Command(BaseCommand):
    help = 'Populates the UserFile model with tags'

    def handle(self, *args, **options):
        UserFile.objects.all().delete()  # Clear existing user files
        files = [
            {"name": "Worksheet of Algebraic Equations for Grade 10 Students", "file": "files/document1.pdf"},
            {"name": "Detailed Notes on World History: Ancient Civilizations and Cultures", "file": "files/document2.pdf"},
            {"name": "Presentation on Quantum Physics: Theoretical Concepts and Applications", "file": "files/presentation1.pptx"},
            {"name": "Study Guide for Advanced Mathematics: Differential Equations and Calculus", "file": "files/document3.pdf"},
            {"name": "Comprehensive Overview of European Renaissance Art and Architecture", "file": "files/document4.pdf"},
        ]

        tags = Tag.objects.all()

        # Shuffle the files to randomize the selection
        random.shuffle(files)

        for file_data in files[:5]:
            user = random.choice(Profile.objects.all())
            file_instance = UserFile.objects.create(name=file_data['name'], file=file_data['file'], author=user)

            # Decide how many tags to assign to this file (up to 5)
            num_tags = random.randint(0, 5)
            tags_to_assign = random.sample(list(tags), min(num_tags, len(tags)))
            file_instance.tag.add(*tags_to_assign)

            # Assign the file to the current user
            file_instance.save()
            user.my_files.add(file_instance)

            self.stdout.write(self.style.SUCCESS('Successfully created UserFile'))

        self.stdout.write(self.style.SUCCESS('Successfully populated UserFile model with tags'))
