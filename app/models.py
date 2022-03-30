from django.db import models
from django.db import models
from django.contrib.auth.models import User,AbstractUser
import uuid
from django.conf import settings


class Item(models.Model):
    title = models.CharField(max_length=200)
   
    class ItemCategory(models.TextChoices):
        ID = 'ID', 'ID Card'
        DOCUMENT = 'Doc', "Document"
    category = models.CharField(choices=ItemCategory.choices, max_length=200)
    name = models.CharField(max_length=200 , blank=True)
    id_number = models.IntegerField(blank=True)
    description = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    timestamp =models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=200)
    class ItemType(models.TextChoices):
        LOST = 'LOST', 'Lost'
        FOUND = 'FOUND', 'Found'
        
    item_type = models.CharField(choices=ItemType.choices, max_length=200)
    
    is_claimed = models.BooleanField(default=False)
    report = models.TextField(blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
   
    
    def __str__(self):
        return self.name