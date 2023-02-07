from django.urls import path
from . import views



urlpatterns = [
    path('profile/<int:pk>/', views.SingleProfile.as_view()),
    path('profile/', views.SingleProfile.as_view()),
    path('profiles/', views.ProfileList.as_view()),
]
