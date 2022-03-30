from django.contrib import admin
from .models import Item

from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin



admin.site.register(Item)
