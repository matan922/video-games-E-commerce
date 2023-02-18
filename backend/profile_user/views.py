import json
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from gamelist.pagination import CustomPageNumberPagination
from gamelist.serializers import GameSerializer
from profile_user.serializers import ProfileSerializer
from .models import Profile
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.exceptions import NotAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser



# Create your views here.


# Custom permission for Profile

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user



# ------------------------- PROFILE START ------------------------- #

class SingleProfile(RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    parser_class=(MultiPartParser,FormParser)

    def get_object(self):
        if 'pk' in self.kwargs:
            profile = get_object_or_404(Profile, pk=self.kwargs.get('pk'))
        elif 'pk' not in self.kwargs and self.request.user.is_authenticated:
            profile = get_object_or_404(Profile, user=self.request.user)
        else:
            raise NotAuthenticated
        
        return profile

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user.id != request.user.id:
            return Response({"message": "You do not have permission to update this profile."}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)


class ProfileList(ListAPIView):
    """
    List all profiles.
    """
    permission_classes = [AllowAny]
    pagination_class = CustomPageNumberPagination


    def get_queryset(self):
        query = self.request.GET.get("search", None)
        profiles = Profile.objects.all()
        if query:
            profiles = Profile.objects.filter(display_name__icontains=query)
        return profiles
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProfileSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = ProfileSerializer(queryset, many=True)
            return Response(serializer.data)

        



# ------------------------- PROFILE END ------------------------- #
