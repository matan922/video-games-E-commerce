from rest_framework import serializers
from gamelist.serializers import GameSerializer
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = "__all__"

    games_bought = serializers.StringRelatedField(many=True)


