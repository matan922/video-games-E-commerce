from django.contrib import admin
from .models import Game,Genre_Extracted,Genre, Order, OrderDetail

# Register your models here.


admin.site.register(Game)
admin.site.register(Genre)
admin.site.register(Genre_Extracted)
admin.site.register(Order)
admin.site.register(OrderDetail)

