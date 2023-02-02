from rest_framework import serializers
from .models import Game, Genre, Genre_Extracted

 
 



class GenreExtractedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre_Extracted
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    class Meta:
        model = Game
        fields = '__all__'
        
