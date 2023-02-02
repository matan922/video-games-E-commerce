from django.db import models
from django.contrib.auth.models import User

from gamelist.models import Game

# Create your models here.

class ProfileManager(models.Manager):
    def get_or_create_profile(self, user):
        try:
            profile = self.get(user=user)
        except Profile.DoesNotExist:
            profile = self.create(user=user)
        return profile

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=25)
    avatar = models.ImageField(upload_to='avatars/')
    bio = models.TextField(blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    games = models.ManyToManyField(Game, null=True)

    def __init__(self, *args, **kwargs):
        super(Profile, self).__init__(*args, **kwargs)
        self.location = "Unknown"
        self.bio = "I'm a new user!"

    def __str__(self):
        return self.user.username

