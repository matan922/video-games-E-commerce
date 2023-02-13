from django.contrib import admin
from .models import Game,Genre, Order, OrderDetail # Genre_Extracted

# Register your models here.


admin.site.register(Game)
admin.site.register(Genre)
# admin.site.register(Genre_Extracted)
admin.site.register(Order)
admin.site.register(OrderDetail)

