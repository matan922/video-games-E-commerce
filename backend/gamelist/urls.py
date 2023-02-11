"""myproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views


urlpatterns = [
    path('games/', views.Games.as_view(), name='game-list'),
    path('game/<int:pk>/', views.GameDetail.as_view(), name='game-detail'),
    path('genres/', views.Genres.as_view(), name='genre-list'),
    path('genre/<int:pk>/', views.GenreDetail.as_view(), name='genre-detail'),
    path('genres_extracted/', views.ExtractedGenres.as_view(), name='genre-list'),
    path('genre_extracted/<int:pk>/', views.ExtractedGenreDetail.as_view(), name='genre-detail'),
    path('orders/', views.OrderGames.as_view(), name='genre-detail'),
    path('steamapi/<int:appid>/', views.SteamGames.as_view(), name='steam-games'),
    
    # path('purchase/<str:pk>/', views.OrderGameDetail.as_view(), name='genre-detail'),
    # path('purchase_dets/', views.OrderGamesDetails.as_view(), name='genre-detail'),
]
