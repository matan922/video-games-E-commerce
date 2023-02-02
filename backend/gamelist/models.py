from django.db import models

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


    def __init__(self, *args, **kwargs):
        super(Game, self).__init__(*args, **kwargs)

    def __str__(self):
        return self.game_name


class Genre_Extracted(models.Model):
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE,null=True, related_name="genres")
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True, related_name="games")



