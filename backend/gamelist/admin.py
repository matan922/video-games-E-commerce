from django.contrib import admin
from .models import Game,Genre_Extracted,Genre

# Register your models here.


admin.site.register(Game)
admin.site.register(Genre)
admin.site.register(Genre_Extracted)

