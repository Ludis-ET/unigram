from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Populates the User model with real data'

    def handle(self, *args, **options):
        User.objects.all().delete()  # Clear existing users
        users_data = [
            {"first_name": "John", "last_name": "Doe", "email": "john.doe@example.com"},
            {"first_name": "Alice", "last_name": "Smith", "email": "alice.smith@example.com"},
            {"first_name": "Bob", "last_name": "Johnson", "email": "bob.johnson@example.com"},
            {"first_name": "Emma", "last_name": "Brown", "email": "emma.brown@example.com"},
            {"first_name": "Michael", "last_name": "Williams", "email": "michael.williams@example.com"},
            {"first_name": "Emily", "last_name": "Jones", "email": "emily.jones@example.com"},
            {"first_name": "David", "last_name": "Garcia", "email": "david.garcia@example.com"},
            {"first_name": "Sarah", "last_name": "Martinez", "email": "sarah.martinez@example.com"},
            {"first_name": "James", "last_name": "Hernandez", "email": "james.hernandez@example.com"},
            {"first_name": "Olivia", "last_name": "Lopez", "email": "olivia.lopez@example.com"},
            {"first_name": "Sophia", "last_name": "Rodriguez", "email": "sophia.rodriguez@example.com"},
            {"first_name": "Alexander", "last_name": "Perez", "email": "alexander.perez@example.com"},
            {"first_name": "Mia", "last_name": "Turner", "email": "mia.turner@example.com"},
            {"first_name": "William", "last_name": "Scott", "email": "william.scott@example.com"},
            {"first_name": "Isabella", "last_name": "Bennett", "email": "isabella.bennett@example.com"},
            {"first_name": "Ava", "last_name": "Flores", "email": "ava.flores@example.com"},
            {"first_name": "Elijah", "last_name": "Russell", "email": "elijah.russell@example.com"},
            {"first_name": "Sophie", "last_name": "Price", "email": "sophie.price@example.com"},
            {"first_name": "Daniel", "last_name": "Long", "email": "daniel.long@example.com"},
            {"first_name": "Victoria", "last_name": "Howard", "email": "victoria.howard@example.com"},
            # Add more user data as needed
        ]
        for i in range(30):
            user_data = users_data[i % len(users_data)]  # Loop through the user data cyclically
            first_name = user_data["first_name"]
            last_name = user_data["last_name"]
            email = f"{first_name.lower()}.{last_name.lower()}{i + 1}@example.com"
            username = f'{first_name.lower()}{last_name.lower()}{i + 1}'
            password = 'password123'  # You can set a default password here
            User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name)
        self.stdout.write(self.style.SUCCESS('Successfully populated User model with real data'))
