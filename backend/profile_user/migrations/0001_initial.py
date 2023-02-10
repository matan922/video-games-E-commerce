# Generated by Django 4.1.5 on 2023-02-07 16:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gamelist', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display_name', models.CharField(max_length=25, null=True)),
                ('avatar', models.ImageField(null=True, upload_to='avatars/')),
                ('bio', models.TextField(blank=True, null=True)),
                ('joined_at', models.DateTimeField(auto_now_add=True)),
                ('games', models.ManyToManyField(null=True, to='gamelist.game')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
