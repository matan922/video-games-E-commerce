from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from myproj.decorators.log import logger_decorator
from .serializers import LogoutSerializer
from rest_framework.exceptions import AuthenticationFailed



# ------------------------- LOG IN START ------------------------- #

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    @logger_decorator
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["username"] = user.username
        token["is_staff"] = user.is_staff
        # ...
        return token
    @logger_decorator
    def validate(self, attrs):
        data = super().validate(attrs)    
        user = self.user

        if not user:
            raise AuthenticationFailed({"error":"Invalid username or password"})

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ------------------------- LOG IN END ------------------------- #

# ------------------------- REGISTER START ------------------------- #

class RegisterView(APIView):
    @logger_decorator
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        if User.objects.filter(email=email).exists():
            return Response({"error": "This email is already being used."}, status=status.HTTP_400_BAD_REQUEST)
        if not (username and password and email):
            return Response({"error": "Please provide all fields."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            User.objects.get(username=username)
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()
            return Response({"success": "User registered successfully."}, status=status.HTTP_201_CREATED)
        

class RegisterStaffView(APIView):
    @logger_decorator
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        if User.objects.filter(email=email).exists():
            return Response({"error": "This email is already being used."}, status=status.HTTP_400_BAD_REQUEST)
        if not (username and password and email):
            return Response({"error": "Please provide all fields."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            User.objects.get(username=username)
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            user = User.objects.create_user(username=username, password=password, email=email)
            user.is_staff = True
            user.save()
            return Response({"success": "User registered successfully."}, status=status.HTTP_201_CREATED)

# ------------------------- REGISTER END ------------------------- #


# ------------------------- LOG OUT START ------------------------- #

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LogoutSerializer

    @logger_decorator
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ------------------------- LOG OUT END ------------------------- #

