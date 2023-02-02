from django.urls import path
from . import views



urlpatterns = [
    path('profile/', views.ProfileRetrieveView.as_view()),
    path('edit_prof/', views.ProfileUpdateView.as_view()),
]
