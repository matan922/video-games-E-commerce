# Generated by Django 4.1.5 on 2023-02-17 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='placeholder.png', null=True, upload_to='avatars/'),
        ),
    ]