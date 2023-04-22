from django.db.models.signals import post_save  # Import a post_save signal when a user is created
from django.contrib.auth.models import User  # Import the built-in User model, which is a sender
from django.dispatch import receiver  # Import the receiver
from .models import UserProfile


def profile_creation_signal(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(pk=instance.id, user=instance)


post_save.connect(profile_creation_signal, sender=User)
