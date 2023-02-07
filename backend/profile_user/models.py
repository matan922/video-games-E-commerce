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
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    display_name = models.CharField(max_length=25, null=True)
    avatar = models.ImageField(upload_to='avatars/',null=True)
    bio = models.TextField(blank=True,null=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    games = models.ManyToManyField(Game, null=True)


    def __str__(self):
        return self.user.username

