import random
from django.core.management.base import BaseCommand
from post.models import Post, Tag  # Import the necessary models from your app

class Command(BaseCommand):
    help = 'Connects posts with up to 10 random tags'

    def handle(self, *args, **options):
        posts = Post.objects.all()
        tags = Tag.objects.all()
        for post in posts:
            # Choose a random number of tags to connect to this post (up to 10)
            num_tags = random.randint(3, 7)
            tags_to_connect = random.sample(list(tags), min(num_tags, len(tags)))
            post.tags.add(*tags_to_connect)
            self.stdout.write(self.style.SUCCESS(f'Successfully connected {num_tags} tags to post "{post.name}"'))

        self.stdout.write(self.style.SUCCESS('Successfully connected posts with random tags'))
