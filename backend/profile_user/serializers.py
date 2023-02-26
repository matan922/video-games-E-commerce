from rest_framework import serializers
from gamelist.serializers import GameSerializer
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = "__all__"

    games_bought = serializers.StringRelatedField(many=True)

    def get_avatar_url(self, obj):
        if obj.avatar:
            return self.context['request'].build_absolute_uri(obj.avatar.url)
        else:
            return None
