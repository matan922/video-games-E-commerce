# Generated by Django 4.1.5 on 2023-02-01 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gamelist', '0001_initial'),
        ('profile_user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='display_name',
            field=models.CharField(max_length=25),
        ),
        migrations.AlterField(
            model_name='profile',
            name='games',
            field=models.ManyToManyField(null=True, to='gamelist.game'),
        ),
    ]
