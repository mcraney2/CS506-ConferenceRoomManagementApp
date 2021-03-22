from rest_framework import serializers
from backend_app.models import Admin, Group, Room, DailyCalendar, Event, Request
from  django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class AdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    class Meta:
        model = Admin
        fields = ['user']

class GroupSerializer(serializers.ModelSerializer):
    managername = serializers.StringRelatedField(source='manager', read_only=True)
    user = UserSerializer(read_only = True)
    class Meta:
        model = Group
        fields = ['groupname', 'groupcode', 'managername','user'] 

class RoomSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(source='group.groupname', read_only=True)
    class Meta:
        model = Room
        fields = ['roomnumber', 'groups']  

class DailyCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyCalendar
        fields = '__all__'  

class EventSerializer(serializers.ModelSerializer):
    roomId = serializers.CharRelatedField(source='room.roomnumber', read_only=True)
    admin = serializers.StringRelatedField(source='creator', read_only=True)
    dates = serializers.DateRelatedField(source='date', read_only=True)
    class Meta:
        model = Event
        fields = '__all__'  

class RequestSerializer(serializers.ModelSerializer):
    requestors = serializers.ReadOnlyField(source='requestor')
    roomId = serializers.CharRelatedField(source='room.roomnumber', read_only=True)
    conflicts = EventSerializer(read_only = True)
    class Meta:
        model = Request
        fields = '__all__' 
