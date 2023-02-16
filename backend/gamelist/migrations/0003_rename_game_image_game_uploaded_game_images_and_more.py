# Generated by Django 4.1.5 on 2023-02-15 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gamelist', '0002_alter_game_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='game',
            old_name='game_image',
            new_name='uploaded_game_images',
        ),
        migrations.AddField(
            model_name='game',
            name='game_image_steam_api',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='genres',
            field=models.ManyToManyField(related_name='genres', to='gamelist.genre'),
        ),
    ]