
from django.urls import path , include , url
from . import views
from .views import *
urlpatterns = [
    path('', views.ApiOverview, name='home'),
    path('all/', views.view_items, name='view_items'),
    path('update/<int:pk>/', views.update_items, name='update-items'),
    path('item/<int:pk>/delete/', views.delete_items, name='delete-items'),
    path('post-item/', views.post_item, name='post-item'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    url(r'^$', 'path.to.function')
    
]