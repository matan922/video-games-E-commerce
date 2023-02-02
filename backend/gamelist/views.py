from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import Game,Genre, Genre_Extracted
from .serializers import GameSerializer, GenreSerializer, GenreExtractedSerializer
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# Create your views here.



# @permission_classes([IsAuthenticated])
# -------------------- Games Start ------------------------

class Games(APIView):
    def get(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameDetail(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        try:
            return Game.objects.get(pk=pk)
        except Game.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        game = self.get_object(pk)
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

# ------------------------- Genre_Extracted Start -------------------

class ExtractedGenres(APIView):
    def get(self, request):
        genres = Genre_Extracted.objects.all()
        serializer = GenreExtractedSerializer(genres, many=True)
        return Response(serializer.data)

class ExtractedGenreDetail(APIView):
    def get_object(self, pk):
        try:
            return Genre_Extracted.objects.get(pk=pk)
        except Genre_Extracted.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        genre = self.get_object(pk)
        serializer = GenreExtractedSerializer(genre)
        return Response(serializer.data)


# ------------------------- Genre_Extracted End -------------------