from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from backend_app.serializers import UserSerializer,AdminSerializer,GroupSerializer,RoomSerializer,DailyCalendarSerializer,EventSerializer,RequestSerializer
from backend_app.models import Admin, Group, Room, DailyCalendar, Event, Request
from  django.contrib.auth.models import User
# from rest_framework import serializers
from django.forms.models import model_to_dict
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# login authentication
# "login/"
@api_view(['GET'])
def login(request):
    if request.method == 'GET':
        data = JSONParser().parse(request)
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:  # A backend authenticated the credentials
            # TODO: report error to the frontend
            try:
                admin = user.admin
                # TODO: direct to admin's page
                # TODO: check if admin is new (i.e., has creted a group)
            except:
                # TODO: direct to user's page
                # TODO: check if user is new (i.e., has joined in a group)
        else:  # No backend authenticated the credentials
            # TODO: report error to the frontend

# create new user account
# "signup/"
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)  # TODO: is frontend/backend that checks the 2 parrwords match or not
        user = User.objects.create_user(username=data['username'], password=data['password'])
        #if:  # TODO: create a amin account
            

# TODO: new admin creates a group
@api_view(['POST'])
def admin_create_group(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # TODO: call serlizer
        # TODO:
        

# TODO: admin adds a conference room
@api_view(['POST'])
def admin_add_confroom(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # TODO: call serlizer


# TODO: admin goes to the request page
@api_view(['GET'])
def admin_view_requests(request):
    if request.method == 'GET':
        data = JSONParser().parse(request)
        # TODO: get a list of requets, sorting by the request date and time
        

# TODO: admin approves/rejects a request
@api_view(['PUT','POST'])
def admin_process_request(request):
    if request.method == 'PUT':  # admin rejects a request -> update request 
        data = JSONParser().parse(request)
    if request.method == 'PUT':  # admin aprrove a request -> update request and create corresponding events
        data = JSONParser().parse(request)

# TODO: in edit event page, admin selects a date
@api_view(['GET'])
def admin_view_events(request):
    if request.method == 'GET':
        data = JSONParser().parse(request)
        # TODO: get a list of events

# TODO: Event: admin click the “edit/delete” bottom
@api_view(['PUT','DELETE'])
def admin_manage_event(request):
    if request.method == 'PUT': # TODO: edit an event
        data = JSONParser().parse(request)
    if request.method == 'DELETE': # TODO: delte an event
       

# TODO: admin creates events
@api_view(['POST'])
def admin_create_events(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # TODO: call serlizer


# TODO: new user joins a group'
@api_view(['POST'])
def user_join_group(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # TODO: call serlizer

# TODO: user requests calendar for a selected room ; user switches between daily/weekly display of the calendar; user moves to the next/last day/week
@api_view(['GET'])
def user_join_group(request):
    if request.method == 'GET':
        data = JSONParser().parse(request)


# TODO: user sends a request
@api_view(['POST'])
def user_send_request(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # TODO: call serlizer

        
# TODO: Kiosk


