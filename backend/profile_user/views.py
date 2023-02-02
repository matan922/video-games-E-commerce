from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework import status
from profile_user.serializers import ProfileSerializer
from .models import Profile
from rest_framework.generics import UpdateAPIView,RetrieveAPIView


# Create your views here.

# ------------------------- PROFILE START ------------------------- #

class ProfileRetrieveView(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        user = self.request.user.id
        print(user)
        return self.queryset.get(user=user)

class ProfileUpdateView(UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user.id
        return self.queryset.get(user=user)

# ------------------------- PROFILE END ------------------------- #
