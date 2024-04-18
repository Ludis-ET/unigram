import random
from django.core.management.base import BaseCommand
from core.models import Organization  # Replace 'your_app' with the name of your Django app

ethiopian_universities = [
    "Addis Ababa University",
    "Addis Ababa Science and Technology University",
    "Mekelle University",
    "Hawassa University",
    "Jimma University",
    "Bahir Dar University",
    "Haramaya University",
    "Adama Science and Technology University",
    "Wollo University",
    "Arba Minch University",
    "Dire Dawa University",
    "Dilla University",
    "Debre Berhan University",
    "Gondar University",
    "Jigjiga University",
    "Woldia University",
    "Wolaita Sodo University",
    "Bule Hora University",
    "Metu University",
    "Debre Tabor University"
]

class Command(BaseCommand):
    help = 'Populates the Organization model with Ethiopian university names'

    def handle(self, *args, **options):
        Organization.objects.all().delete()  
        for university_name in ethiopian_universities:
            # Example address
            address = 'Ethiopia'
            # Randomly select between two logo URLs
            logo_path = random.choice(['organization/logo/logo1.jpg', 'organization/logo/logo2.png'])
            Organization.objects.create(name=university_name, logo=logo_path, address=address)
        self.stdout.write(self.style.SUCCESS('Successfully populated Organization model with Ethiopian university names'))
