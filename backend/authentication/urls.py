from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('register/', views.RegisterView.as_view()),
    path('register_staff/', views.RegisterStaffView.as_view()),    
    path('api/token/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]
