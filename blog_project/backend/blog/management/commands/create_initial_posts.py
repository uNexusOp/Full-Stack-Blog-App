from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from blog.models import Post

class Command(BaseCommand):
    help = 'Creates initial blog posts'

    def handle(self, *args, **options):
        # Create a superuser if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')

        # Get the admin user
        admin = User.objects.get(username='admin')

        # Create some initial posts
        posts = [
            {
                'title': 'Welcome to the Blog',
                'content': 'This is the first post on our blog. We hope you enjoy reading our content!',
            },
            {
                'title': 'Getting Started with Django',
                'content': 'Django is a powerful web framework for Python. It makes web development fast and easy.',
            },
            {
                'title': 'React and Django: A Perfect Match',
                'content': 'Learn how to combine React frontend with Django backend to create modern web applications.',
            },
        ]

        for post_data in posts:
            if not Post.objects.filter(title=post_data['title']).exists():
                Post.objects.create(
                    title=post_data['title'],
                    content=post_data['content'],
                    author=admin
                )
                self.stdout.write(self.style.SUCCESS(f'Created post: {post_data["title"]}')) 