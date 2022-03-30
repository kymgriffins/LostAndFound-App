from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from django.urls import path , include
from .views import MyTokenObtainPairView
from . import views
urlpatterns = [
    path('', views.getRoutes, name='home'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    
]