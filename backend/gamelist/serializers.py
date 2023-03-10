from rest_framework import serializers
from .models import Game, Genre, Order, OrderDetail, Order, Review # Genre_Extracted

 
 



# class GenreExtractedSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Genre_Extracted
#         fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    class Meta:
        model = Game
        fields = '__all__'




class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Order.objects.create(**validated_data,user=user)


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta: 
        model = Review
        fields = '__all__'

    def create(self, validated_data): 
        user = self.context['user']
        return Review.objects.create(**validated_data, user=user)
    
