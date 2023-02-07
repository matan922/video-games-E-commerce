from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

# Create your models here.


class Genre(models.Model):
    genre_name = models.CharField(max_length=255)

    def __str__(self):
        return self.genre_name


class Game(models.Model):
    game_image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    appid = models.IntegerField(null=True)
    game_name = models.CharField(max_length=255)
    release_date = models.DateField()
    developer = models.CharField(max_length=255)
    publisher = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    genres = models.ManyToManyField(Genre, through='Genre_Extracted')

    def __str__(self):
        return self.game_name


class Genre_Extracted(models.Model):
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE,null=True, related_name="genres")
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True, related_name="games")



class Order(models.Model):
    order_id = models.BigAutoField(primary_key=True)
    date_of_order = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    full_name = models.CharField(max_length=50)
    zip = models.CharField(max_length=30)

    def __str__(self):
        return str(self.order_id)


class OrderDetail(models.Model):
    order_detail_id = models.BigAutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True)


    def __str__(self):
        return str(self.order_detail_id)

