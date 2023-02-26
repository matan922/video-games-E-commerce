from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.http import Http404
import requests
from .models import Game,Genre, Order, Review # Genre_Extracted
from .serializers import GameSerializer, GenreSerializer, OrderDetailSerializer, OrderSerializer, ReviewSerializer # GenreExtractedSerializer
from rest_framework import status
from .pagination import CustomPageNumberPagination

# custom made logger using decorator.
from myproj.decorators.log import logger_decorator

# Create your views here.

# ------------------------- Genres Start ------------------------

# Get all genres. (categories)
class Genres(APIView):
    @logger_decorator
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)

# Get a single genre.
class GenreDetail(APIView):
    @logger_decorator
    def get_object(self, pk):
        try:
            return Genre.objects.get(pk=pk)
        except Genre.DoesNotExist:
            raise Http404
        
    @logger_decorator
    def get(self, request, pk):
        genre = self.get_object(pk)
        serializer = GenreSerializer(genre)
        return Response(serializer.data)

# ------------------------- Genres End ------------------------

# -------------------- Games Start ------------------------


class Games(ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    pagination_class = CustomPageNumberPagination

    # Get a queryset of all games or filter them in certain ways.
    @logger_decorator
    def get_queryset(self):
        query = self.request.GET.get("search", None)
        sort = self.request.GET.get("sort", None)
        games = Game.objects.all()
        if query:
            # Used to filter games based on user input.
            games = games.filter(game_name__icontains=query)
        if sort:
            # Used to filter games based on category a user has chose.
            games = games.filter(genres__genre_name__iexact=sort)
        return games

    # Gets all games (or filtered ones) and paginate them from the queryset above.
    @logger_decorator
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = GameSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = GameSerializer(queryset, many=True)
            return Response(serializer.data)

    # Post a new game in the shop.
    @logger_decorator
    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameDetail(APIView):
    @logger_decorator
    def get_object(self, pk):
        try:
            return Game.objects.get(pk=pk)
        except Game.DoesNotExist:
            raise Http404
        
    # Get single game
    @logger_decorator
    def get(self, request, pk):
        game = self.get_object(pk)
        serializer = GameSerializer(game)
        steam_game = requests.get(f'https://store.steampowered.com/api/appdetails?appids={game.appid}')
        full_game_info = {}
        full_game_info["my_app"] = serializer.data
        full_game_info["steam_game"] = steam_game.json()[str(game.appid)]
        return Response(full_game_info)

    # Update a game
    @logger_decorator
    def put(self, request, pk):
        game = self.get_object(pk)
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete from shop
    @logger_decorator
    def delete(self, request, pk):
        game = self.get_object(pk)
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ------------------------- Games End ---------------------------


class OrderGames(APIView):
# see user's orders.
    @logger_decorator
    def get(self, request):
        user= request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# create a new order for the authenticated user.
    @logger_decorator
    def post(self, request):
        # give a context for the user and his order data and saving it in Order table.
        serializer = OrderSerializer(data=request.data["orderData"], context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            print("seralizer valid")
            serializer.save()
            # looping through the order details
            for item in request.data["orderDetails"]:
                # creating a new object pushing an item's id and taking the last order's id that was pushed in the database.
                order_dets = {}
                order_dets["game"] = item["id"]
                order_dets['order']=Order.objects.values_list('id', flat=True).filter(user=request.user.id).last()
                serializer2 = OrderDetailSerializer(data=order_dets)
                # pushing the new object into OrderDetail table.
                if serializer2.is_valid(raise_exception=True):
                    serializer2.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ReviewView(APIView):
    serializer_class = ReviewSerializer
    @logger_decorator
    def get(self, request, pk):
        reviews = Review.objects.filter(game=Game.objects.get(id=pk))
        serializer = self.serializer_class(reviews, many=True)
        return Response(serializer.data)
    
    @logger_decorator
    def post(self, request):
        serializer = ReviewSerializer(data = request.data, context = {"user": request.user})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



'''
Used to populate the db with images from steam api
to not go over the cap of requests to steam by just 
scrolling through the app. (only main game images)
 ''' 
class SteamGames(APIView):
    @logger_decorator
    def get(self, request):
        games = Game.objects.all().filter(game_image = "")
        for game in games:
            print(game)
            steam_game = requests.get(f'https://store.steampowered.com/api/appdetails?appids={game.appid}').json()
            try:
                steam_appid = steam_game[str(game.appid)]['data']['steam_appid']
                game_details = steam_game[str(game.appid)]['data']['header_image']
                if game.appid == steam_appid:
                    game.game_image = game_details
                    game.save()
            except:
                # an except because some of steam game's appids don't work so I found a different link I can get all main images from.
                game.game_image = f'https://cdn.cloudflare.steamstatic.com/steam/apps/{game.appid}/header.jpg?'
                game.save()
                
        return Response("all done")