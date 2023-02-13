from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.http import Http404
import requests
from profile_user.serializers import ProfileSerializer
from .models import Game,Genre, OrderDetail, Order, Review # Genre_Extracted
from .serializers import GameSerializer, GenreSerializer, OrderDetailSerializer, OrderSerializer, ReviewSerializer # GenreExtractedSerializer
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from profile_user.models import Profile
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from .pagination import CustomPageNumberPagination


# Create your views here.



# ------------------------- Genres Start ------------------------
class Genres(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)


class GenreDetail(APIView):
    def get_object(self, pk):
        try:
            return Genre.objects.get(pk=pk)
        except Genre.DoesNotExist:
            raise Http404

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


    def get_queryset(self):
        query = self.request.GET.get("search", None)
        if query:
            games = Game.objects.filter(game_name__icontains=query)
        else:
            games = Game.objects.all()
        return games

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        print(queryset)
        current_page = self.request.query_params.get('page', 1) 
        serializer = GameSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def get(self, request):
    #     query = request.GET.get("search", None)
    #     page = request.GET.get("page", 1)
    #     if query:
    #         games = Game.objects.filter(game_name__icontains=query)
    #     else:
    #         games = Game.objects.all()

    #     paginator = Paginator(games, 10)
    #     try:
    #         games_page = paginator.page(page)
    #     except PageNotAnInteger:
    #         games_page = paginator.page(1)
    #     except EmptyPage:
    #         games_page = paginator.page(paginator.num_pages)
    #     serializer = GameSerializer(games_page, many=True)
    #     return Response(serializer.data)
        
        # query = request.GET.get("search", None)
        # if query:
        #     games = Game.objects.filter(game_name__icontains=query)
        # else:
        #     games = Game.objects.all()
        # serializer = GameSerializer(games, many=True)
        # return Response(serializer.data)



class GameDetail(APIView):

    def get_object(self, pk):
        try:
            return Game.objects.get(pk=pk)
        except Game.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        game = self.get_object(pk)
        genres = Genre.objects.all()
        serializer = GameSerializer(game)
        return Response(serializer.data)

    def put(self, request, pk):
        game = self.get_object(pk)
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        game = self.get_object(pk)
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ------------------------- Games End ---------------------------


# ------------------------- Genre_Extracted Start -------------------

# class ExtractedGenres(APIView):
#     def get(self, request):
#         genres = Genre_Extracted.objects.all()
#         serializer = GenreExtractedSerializer(genres, many=True)
#         return Response(serializer.data)

# class ExtractedGenreDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return Genre_Extracted.objects.get(pk=pk)
#         except Genre_Extracted.DoesNotExist:
#             raise Http404

#     def get(self, request, pk):
#         genre = self.get_object(pk)
#         serializer = GenreExtractedSerializer(genre)
#         return Response(serializer.data)


# ------------------------- Genre_Extracted End -------------------




# @permission_classes([IsAuthenticated])
class OrderGames(APIView):
# see user's orders.
    def get(self, request):
        user= request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# create a new order for the authenticated user.
    def post(self, request):
        serializer = OrderSerializer(data=request.data["orderData"], context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            for item in request.data["orderDetails"]:
                # print(request.data)
                order_dets = {}
                order_dets["game"] = item["id"]
                order_dets['order']=Order.objects.values_list('id', flat=True).filter(user=request.user.id).last()
                serializer2 = OrderDetailSerializer(data=order_dets)
                if serializer2.is_valid(raise_exception=True):
                    serializer2.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class ReviewView(APIView):

    def get(self, request, pk):
        reviews = Review.objects.filter(game=Game.objects.get(id=pk))
        serializer = ReviewSerializer(reviews, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        user = request.user
        print(data)
        print(user)
        if request.user.is_authenticated:
            game = Game.objects.get(id = data['id'])
            print("in if")
            reviewing_user = User.objects.get(username = user.username)
            Review.objects.create(
                game = game, 
                user = reviewing_user, 
                customer_name = user.username,
                rating = data['rating'], 
                description = data['description'])
            return Response({"succecss": "Added."}, status = status.HTTP_200_OK)
        return Response({"error": "Please log in to leave a review."}, status=status.HTTP_401_UNAUTHORIZED)











class SteamGames(APIView):
    def get(self, request, appid):
        steam_game = requests.get(f'https://store.steampowered.com/api/appdetails?appids={appid}')
        return Response(steam_game.json())




# -----------------------------------------------------

# class OrderGameDetail(APIView):

#     def get(self, request, pk):
#         orders = Order.objects.get(id=pk)
#         print(orders)
#         serializer = OrderSerializer(orders)
#         return Response(serializer.data)

# --------------------------------------------------------

# class OrderGamesDetails(APIView):

#     def get(self, request):
#         order_detail = OrderDetail.objects.all()
#         serializer = OrderDetailSerializer(order_detail, many=True)
#         return Response(serializer.data)