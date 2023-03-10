from django.db import models
from django.contrib.auth.models import User
import json
from gamelist.models import Game, Order

# Create your models here.

class ProfileManager(models.Manager):
    def get_or_create_profile(self, user):
        try:
            profile = self.get(user=user)
        except Profile.DoesNotExist:
            profile = self.create(user=user)
        return profile

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null = True)
    display_name = models.CharField(max_length=25, null = True, default='New Account')
    avatar = models.ImageField(upload_to='avatars/',null = True, default='placeholder.png')
    bio = models.TextField(blank=True,null=True)
    joined_at = models.DateTimeField(auto_now_add = True)
    # games = models.ManyToManyField(Game, null = True)
    orders = models.ForeignKey(Order, null = True, on_delete = models.CASCADE)

    def __str__(self):
        return self.user.username

    def games_bought(self):
        game_ids = []
        for order in self.user.orders.all():
            for order_detail in order.games.all():
                game_ids.append(order_detail.game.id)
        print(game_ids)
        return Game.objects.filter(id__in=game_ids)


