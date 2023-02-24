from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from gamelist.models import Game, Genre
from .serializers import GameSerializer
# Create your tests here.

# Define a custom test case that inherits from Django's TestCase
class GamesTest(TestCase):
    # Set up the test client and create some sample data for the tests
    def setUp(self):
        self.client = APIClient()
        self.genre1 = Genre.objects.create(genre_name="Action")
        self.genre2 = Genre.objects.create(genre_name="Adventure")
        self.game1 = Game.objects.create(game_name="Game1", genres=self.genre1)
        self.game2 = Game.objects.create(game_name="Game2", genres=self.genre2)
        self.game3 = Game.objects.create(game_name="Game3", genres=self.genre1)

    # Define a test for getting all games
    def test_get_all_games(self):
        # Send a GET request to the "games" endpoint
        response = self.client.get(reverse("games"))

        # Ensure the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Ensure the response data contains all three games
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        self.assertEqual(response.data, serializer.data)

    # Define a test for filtering games by genre
    def test_filter_by_genre(self):
        # Send a GET request to the "games" endpoint with a "sort" query parameter
        response = self.client.get(reverse("games") + "?sort=Action")

        # Ensure the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Ensure the response data only contains the two games with the "Action" genre
        games = Game.objects.filter(genres__genre_name__iexact="Action")
        serializer = GameSerializer(games, many=True)
        self.assertEqual(response.data, serializer.data)

    # Define a test for searching for games by name
    def test_search_by_name(self):
        # Send a GET request to the "games" endpoint with a "search" query parameter
        response = self.client.get(reverse("games") + "?search=Game1")

        # Ensure the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Ensure the response data only contains the one game with the name "Game1"
        games = Game.objects.filter(game_name__icontains="Game1")
        serializer = GameSerializer(games, many=True)
        self.assertEqual(response.data, serializer.data)
