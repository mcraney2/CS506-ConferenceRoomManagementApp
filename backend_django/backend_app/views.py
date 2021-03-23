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
import string
import random
import datetime

# login authentication
# "room_mgmt/login/"
# request format: {"username": "ruisu","password":"zrs12345"}
# response format: response = {"authenticated": False,"user": False,"new":False,"userid":"id"}
@api_view(['GET'])
def login(request):
    if request.method == 'GET':
        response = {
            "authenticated": False,
            "user": False,
            "new": False,
        }
        data = JSONParser().parse(request)
        # print(data)
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:  # A backend authenticated the credentials
            response["authenticated"]=True       
            try:
                admin = user.admin
                response["userid"] = user.id
                try: 
                    group = admin.group_set.objects.filter(id=1)
                    return JsonResponse(response,status=201)
                except:  # new admin
                    response["new"]=True
                    return JsonResponse(response,status=201)
            except:
                response["user"] = True
                response["userid"] = user.id
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
        # print(User.objects.all())
        try:
            User.objects.get(username=data["username"])  # username already exists'
            # print(User.objects.all())
            return JsonResponse(response, status=201)
        except: # no user exists
            user = User.objects.create_user(username=data['username'], password=data['password'])
            if data["user"] is True:
                response['created']=True
                return JsonResponse(response, status=201)
            else:
                print(type(user))
                admin = Admin.objects.create(user=User.objects.get(username=data['username']))
                admin.save()
                print(admin.user)
                print(user.admin)
                response['created'] = True
                return JsonResponse(response, status=201)

# new admin creates a group
# "room_mgmt/admin/create_group/"
# request format: {"groupname","group1","manager":"ruisu_admin"}  
# response format: {"groupname","group1","manager":"ruisu_admin","groupcode":"LLQIGOBKRYRCPAT"} 
@api_view(['POST'])
def admin_create_group(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        manager = Admin.objects.get(user=User.objects.get(username=data['manager']))
        data['groupcode'] = ''.join(random.choice(string.ascii_uppercase) for i in range(15))
        group = Group.objects.create(groupname=data['groupname'],groupcode=data['groupcode'],manager=manager)
        group.save()
        return JsonResponse(data, status=201)


# admin adds a conference room
# "room_mgmt/admin/add_room/"
# request format: {"groupcode":"LLQIGOBKRYRCPAT","roomnumber":"1123"}
# response format: {"groupcode":"LLQIGOBKRYRCPAT","roomnumber":"1123","roomid"="id"}
@api_view(['POST'])
def admin_add_room(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        group = Group.objects.get(groupcode=data['groupcode'])
        room = Room.objects.create(roomnumber=data['roomnumber'], group=group)
        room.save()
        data["roomid"] = room.id
        return JsonResponse(data, status=201)


# TODO: test needed
# admin goes to the request page
# "room_mgmt/admin/requests/"
# response format: json array
@api_view(['GET'])
def admin_view_requests(request):
    if request.method == 'GET':
        requests = Request.objects.filter(processed=False).order_by('-requesttime')
        return JsonResponse(requests, status=210)

# # TODO: admin approves/rejects a request
# @api_view(['PUT','POST'])
# def admin_process_request(request):
#     if request.method == 'PUT':  # admin rejects a request -> update request 
#         data = JSONParser().parse(request)
#     if request.method == 'PUT':  # admin aprrove a request -> update request and create corresponding events
#         data = JSONParser().parse(request)

# # TODO: in edit event page, admin selects a date
# @api_view(['GET'])
# def admin_view_events(request):
#     if request.method == 'GET':
#         data = JSONParser().parse(request)
#         # TODO: get a list of events

# # TODO: Event: admin click the “edit/delete” bottom
# @api_view(['PUT','DELETE'])
# def admin_manage_event(request):
#     if request.method == 'PUT': # TODO: edit an event
#         data = JSONParser().parse(request)
#     if request.method == 'DELETE': # TODO: delte an event
       

# TODO: admin creates events
# TODO: add feature of supporting repeated events
# "room_mgmt/admin/create_events/"
# time format '%m/%d/%y %H:%M',        # 
# request format: {"eventname":"a conference","roomnumber":"123","creator":"admin_name","starttime":"10/25/21 14:30","endtime":"10/25/21 16:30","repeat":"none"}
# response format: {"eventid":"1"}
@api_view(['POST'])
def admin_create_events(request):
    print(request)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        room = Room.objects.get(roomnumber=data["roomnumber"])
        creator = Admin.objects.get(user=User.objects.get(username=data['creator']))
        starttime = datetime.datetime.strptime(data['starttime'], '%Y-%m-%d %H:%M')
        endtime = datetime.datetime.strptime(data['endtime'], '%Y-%m-%d %H:%M')
        date = starttime.strftime("%Y-%m-%d")

        try:
            dailyCalendar = DailyCalendar.objects.get(date=date)
        except:
            dailyCalendar = DailyCalendar.objects.create(date=date)
            dailyCalendar.save()
        
        event = Event.objects.create(eventname=data["eventname"], room=room, creator=creator, date=dailyCalendar, starttime=starttime, endtime=endtime)
        event.save()

        try:
            Event.objects.get(id=event.id)
            return JsonResponse({"eventid":event.id}, status=201)
        except:
            return JsonResponse(data,status=400)


# # TODO: new user joins a group'
# @api_view(['POST'])
# def user_join_group(request):
#     if request.method == 'POST':
#         data = JSONParser().parse(request)
#         # TODO: call serlizer

# # TODO: user requests calendar for a selected room ; user switches between daily/weekly display of the calendar; user moves to the next/last day/week
# @api_view(['GET'])
# def user_join_group(request):
#     if request.method == 'GET':
#         data = JSONParser().parse(request)


# # TODO: user sends a request
# @api_view(['POST'])
# def user_send_request(request):
#     if request.method == 'POST':
#         data = JSONParser().parse(request)
#         # TODO: call serlizer


# # TODO: Kiosk


