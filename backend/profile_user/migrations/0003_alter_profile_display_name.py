# Generated by Django 4.1.5 on 2023-02-17 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_user', '0002_alter_profile_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='display_name',
            field=models.CharField(default='New Account', max_length=25, null=True),
        ),
    ]