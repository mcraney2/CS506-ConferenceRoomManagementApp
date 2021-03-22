from rest_framework import serializers
from backend_app.models import Admin, Group, Room, DailyCalendar, Event, Request
from  django.contrib.auth.models import User

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__' 

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__' 

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'  

class DailyCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyCalendar
        fields = '__all__'  

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'  

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__' 
