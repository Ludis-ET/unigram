import random
from django.core.management.base import BaseCommand
from post.models import Post, PostImage  # Replace 'your_app' with the name of your Django app
from django.utils.text import slugify

image_urls = [
   "files/images/1.jpg",
   "files/images/2.jpg",
   "files/images/3.jpg",
   "files/images/4.jpg",
    # Add more image URLs as needed
]

class Command(BaseCommand):
    help = 'Populates the PostImage model with random images for each post'

    def handle(self, *args, **options):
        PostImage.objects.all().delete()  # Clear existing post images
        posts = Post.objects.all()
        for post in posts:
            # Decide how many images to assign to this post (between 0 and 3)
            num_images = random.randint(0, 3)
            for _ in range(num_images):
                # Choose a random image URL
                image_url = random.choice(image_urls)
                # Create a PostImage instance and link it to the current post
                PostImage.objects.create(post=post, images=image_url)
                self.stdout.write(self.style.SUCCESS(f'Successfully added image to post "{post.name}"'))
        self.stdout.write(self.style.SUCCESS('Successfully populated PostImage model with random images'))
