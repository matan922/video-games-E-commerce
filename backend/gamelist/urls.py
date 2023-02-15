from django.urls import path
from . import views


urlpatterns = [
    path('games/', views.Games.as_view(), name='game-list'),
    path('game/<int:pk>/', views.GameDetail.as_view(), name='game-detail'),
    path('genres/', views.Genres.as_view(), name='genre-list'),
    path('genre/<int:pk>/', views.GenreDetail.as_view(), name='genre-detail'),
    # path('genres_extracted/', views.ExtractedGenres.as_view(), name='genre-list'),
    # path('genre_extracted/<int:pk>/', views.ExtractedGenreDetail.as_view(), name='genre-detail'),
    path('orders/', views.OrderGames.as_view(), name='genre-detail'),
    path('steamapi/', views.SteamGames.as_view(), name='steam-games'),
    path('reviews/<int:pk>/', views.ReviewView.as_view(), name='review'),
    path('new_review/', views.ReviewView.as_view(), name='review')
]
