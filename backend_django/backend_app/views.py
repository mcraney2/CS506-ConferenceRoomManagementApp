from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from backend_app.serializers import UserSerializer,AdminSerializer,GroupSerializer,RoomSerializer,DailyCalendarSerializer,EventSerializer,RequestSerializer
from backend_app.models import Admin, Group, Room, DailyCalendar, Event, Request
from  django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
from rest_framework.decorators import api_view

# login authentication
# "room_mgmt/login/"
# request format: {"username": "ruisu","password":"zrs12345"}
# response format: response = {"authenticated": False,"user": False,"new":False,}
@api_view(['GET'])
def login(request):
    if request.method == 'GET':
        response = {
            "authenticated": False,
            "user": False,
            "new": False,
        }
        data = JSONParser().parse(request)
        print(data)
        user = authenticate(username=data['username'], password=data['password'])
        print(user)
        if user is not None:  # A backend authenticated the credentials
            response["authenticated"]=True       
            try:
                admin = user.admin
                try: 
                    group = admin.group_set.objects.filter(id=1)
                    return JsonResponse(response,status=201)
                except:  # new admin
                    response["new"]=True
                    return JsonResponse(response,status=201)
            except:
                response["user"]=True
                try: 
                    group = user.group_set.objects.filter(id=1)
                    return JsonResponse(response,status=201)
                except:  # new user
                    response["new"]=True
                    return JsonResponse(response,status=201)
        else:  # No backend authenticated the credentials
            return JsonResponse(response,status=201) #TODO: better ways to send signin error reports

# create new user account
# "room_mgmt/signup/"
# request format: {"username": "ruisu","password":"zrs12345", "user":"True"}
# response format: {"created":False}
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        response = {"created":False}
        data = JSONParser().parse(request)  # TODO: is frontend/backend that checks the 2 parrwords match or not
        try:
            user = User.objects.get(username=data["username"])  # username already exists'
            return JsonResponse(response, status=201)
        except: # no user exists
            user = User.objects.create_user(username=data['username'], password=data['password'])
            if data["user"] is True:
                response['created']=True
                return JsonResponse(response, status=201)
            else:
                admin = Admin.objects.create(user=user)
                admin.save()
                response['created'] = True
                return JsonResponse(response, status=201)

# # TODO: new admin creates a group
# @api_view(['POST'])
# def admin_create_group(request):
#     if request.method == 'POST':
#         data = JSONParser().parse(request)
#         # TODO: generate random group code
#         # TODO: call serlizer
#         # TODO:
        

# # TODO: admin adds a conference room
# @api_view(['POST'])
# def admin_add_confroom(request):
#     if request.method == 'POST':
#         data = JSONParser().parse(request)
#         # TODO: call serlizer


# # TODO: admin goes to the request page
# @api_view(['GET'])
# def admin_view_requests(request):
#     if request.method == 'GET':
#         data = JSONParser().parse(request)
#         # TODO: get a list of requets, sorting by the request date and time
        

# # TODO: admin approves/rejects a request
# @api_view(['PUT','POST'])
# def admin_process_request(request):
#     if request.method == 'PUT':  # admin rejects a request -> update request 
#         data = JSONParser().parse(request)
#     if request.method == 'PUT':  # admin aprrove a request -> update request and create corresponding events
#         data = JSONParser().parse(request)

# TODO: in edit event page, admin selects a date
@api_view(['GET'])
def admin_view_events(request):
    if request.method == 'GET':
        data = JSONParser().parse(request)
        # todo
        return JsonResponse(serializer.data, safe=False)
        

# TODO: Event: admin click the “edit/delete” bottom
@api_view(['PUT','DELETE'])
def admin_manage_event(request):
    if request.method == 'PUT': # TODO: edit an event
        data = JSONParser().parse(request)
        # todo
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    if request.method == 'DELETE': # TODO: delte an event
        ob = Event.objects.get(id=id)
        ob.delete()
        return JsonResponse(status=204)
       

# TODO: admin creates events
@api_view(['POST'])
def admin_create_events(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        room = Room.objects.get(roomnumber=data['roomnumber'])
        manager = Admin.objects.get(user=User.objects.get(username=data['manager']))
        date = DailyCalendar.objects.get(date=data['date'])
        event = Event.objects.create(eventname=data['eventname'],roomnumber=room,creator=manager,date=date,startime=data['startime'],endtime=data['endtime'])
        event.save()
        return JsonResponse(data, status=201)


# TODO: new user joins a group'
@api_view(['POST'])
def user_join_group(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        users = User.object.all()
        serializer = GroupSerializer(users, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

# # TODO: user requests calendar for a selected room ; user switches between daily/weekly display of the calendar; user moves to the next/last day/week
# @api_view(['GET'])
# def user_join_group(request):
#     if request.method == 'GET':
#         data = JSONParser().parse(request)


# TODO: user sends a request
@api_view(['POST'])
def user_send_request(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        requestor = User.object.get(username=data['username'])
        room = Room.objects.get(roomnumber=data['roomnumber'])
        # todo: conflicts
        request = Request.objects.create(requestor=requestor,room=room,startime=data['startime'],endtime=data['endtime'],requesttime=data['requesttime'],repeat=data['repeat'],processed=data['processed'],approved=data['approved'])
        return JsonResponse(serializer.data, status=201)


# # TODO: Kiosk


