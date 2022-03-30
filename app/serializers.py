from django.db.models import fields
from rest_framework import serializers
from .models import Item
from rest_framework.serializers import ModelSerializer



class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'title', 'category', 'name', 'id_number', 'description', 'date_added', 'timestamp', 'location', 'item_type', 'is_claimed', 'report')