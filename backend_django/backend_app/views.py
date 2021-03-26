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
# response format: response = {"authenticated": False,"type": "user/admin","new":False,"userid":"id"}
@api_view(['GET'])
def login(request):
    if request.method == 'GET':
        response = {
            "authenticated": False,
            "type": "admin",
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
                response["type"] = "user"
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
# response format: {"created":False,"userid":"id","adminid":"id"}
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
            response['userid'] = user.id
            if data["user"] is True:
                response['created'] = True
                response['adminid'] = None
                return JsonResponse(response, status=201)
            else:
                admin = Admin.objects.create(user=User.objects.get(username=data['username']))
                admin.save()
                response['created'] = True
                response['adminid'] = admin.id
                return JsonResponse(response, status=201)

# new admin creates a group
# "room_mgmt/admin/create_group/"
# request format: {"groupname","group1","manager":"ruisu_admin"}  
# response format: {"groupname","group1","manager":"ruisu_admin","groupcode":"LLQIGOBKRYRCPAT","groupid":"groupid"} 
@api_view(['POST'])
def admin_create_group(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        manager = Admin.objects.get(user=User.objects.get(username=data['manager']))
        data['groupcode'] = ''.join(random.choice(string.ascii_uppercase) for i in range(15))
        group = Group.objects.create(groupname=data['groupname'],groupcode=data['groupcode'],manager=manager)
        group.save()
        try:
            data['groupid'] = group.id
            return JsonResponse(data, status=201)
        except:
            return JsonResponse({"error":"unable to create group"}, status=400)


# admin adds a conference room
# "room_mgmt/admin/add_room/"
# request format: {"groupcode":"LLQIGOBKRYRCPAT","roomnumber":"1123"}
# response format: {"groupcode":"LLQIGOBKRYRCPAT","roomnumber":"1123","roomid"="id"}
@api_view(['POST'])
def admin_add_room(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        group = Group.objects.get(groupcode=data['groupcode'])
        room = Room.objects.create(roomnumber=data['roomnumber'])
        room.save()
        data["roomid"] = room.id
        return JsonResponse(data, status=201)


# admin view the request page
# "room_mgmt/admin/requests/view/"
# request format: {"adminid":"adminid","groupid":"groupid"}
# response format: "requestlist":requests_list}
@api_view(['GET'])
def admin_view_requests(request):
    if request.method == 'GET':
        requests = Request.objects.filter(processed=False)
        print(requests)
        requests = requests.order_by('-requesttime')
        requests_list = []
        for room_request in requests:
            conflict_list = []
            for conflict in room_request.conflict.all():
                conflict_list.append(str(conflict))
            request_dict = {
                "name": room_request.name,
                "reason": room_request.reason,
                "requester": str(room_request.requester),
                "room": str(room_request.room),
                "starttime": room_request.starttime,
                "endtime": room_request.endtime,
                "requesttime": room_request.requesttime,
                "repeat": room_request.repeat,
                "conflict": conflict_list,
                "requestid": room_request.id,
            }
            requests_list.append(request_dict)
        return JsonResponse({"requestlist":requests_list}, status=210)

# TODO: admin approves/rejects a request
# TODO: check is admin has access to such request 
# "room_mgmt/admin/requests/process/"
# request format: {"adminid":"adminid","requestid":"requestid"}
# resposne format: {"requestid":"room_request.id"} or {"eventid":"event.id"}
@api_view(['PUT','POST'])
def admin_process_request(request):
    if request.method == 'PUT':  # admin rejects a request -> update request 
        data = JSONParser().parse(request)
        room_request = Request.objects.get(id=data['requestid'])
        room_request.processed = True
        room_request.approved = False
        room_request.save(update_fields=['processed','approved'])
        return JsonResponse({"requestid":room_request.id,"processed":room_request.processed,"approved":room_request.approved}, status=210)
    if request.method == 'POST':  # admin aprrove a request -> update request and create corresponding events
        data = JSONParser().parse(request)
        room_request = Request.objects.get(id=data['requestid'])
        room_request.processed = True
        room_request.approved = True
        room_request.save(update_fields=['processed','approved'])
        creator = Admin.objects.get(user=User.objects.get(id=data['adminid']))
        date = room_request.starttime.strftime("%Y-%m-%d")

        try:
            dailyCalendar = DailyCalendar.objects.get(date=date)
        except:
            dailyCalendar = DailyCalendar.objects.create(date=date)
            dailyCalendar.save()
        event = Event.objects.create(eventname=room_request.name, room=room_request.room, creator=creator, date=dailyCalendar, starttime=room_request.starttime, endtime=room_request.endtime)
        event.save()
        return JsonResponse({"requestid":room_request.id,"processed":room_request.processed,"approved":room_request.approved,"eventid":event.id}, status=210)

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
       

# admin creates events, TODO: add feature of supporting repeated events
# "room_mgmt/admin/events/create/"
# time format: '%Y-%m-%d %H:%M',        # 
# request format: {"eventname":"a conference","roomnumber":"123","creator":"admin_name","starttime":"2021-10-25 14:30","endtime":"2021-10-25 16:30","repeat":"none"}
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


# new user joins a group'
# 'user/join_group/'
# request format:{"userid":"12",groupcode":"ABCDE"}
# resposne format: {"groupid": "group.id"}
@api_view(['POST'])
def user_join_group(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        group = Group.objects.get(groupcode=data["groupcode"])
        user = User.objects.get(id=data["userid"])
        group.user.add(user)
        try:
         group.user.get(id=data["userid"])
         return JsonResponse({"groupid":group.id,}, status=201)
        except:
            return JsonResponse({"error":"unable to join in group"}, status=400)

# # TODO: user requests calendar for a selected room ; user switches between daily/weekly display of the calendar; user moves to the next/last day/week
# # mode: "day/week"
# # date format: "%Y-%m-%d"
# # request format: {"userid":"userid","roomname":"roomname","mode":"day",firstday":"%Y-%m-%d"}
# # response format: 
# @api_view(['GET'])
# def user_join_group(request):
#     if request.method == 'GET':
#         data = JSONParser().parse(request) 


# user sends a request
# "user/request"
# # time format: '%Y-%m-%d %H:%M', 
# request format: {"userid":"userid","roomnumber":"number","eventname":"request name","reason":"reason texts","starttime":"2021-10-25 14:30","endtime":"2021-10-25 16:30","requesttime":"2021-03-25 14:30","repeat":"none"}
# response format: {"eventname":"request name","requestid":"requestid"}
# TODO: add features of indetifying/showing conflict
# TODO: add condition: user not have access to this room
@api_view(['POST'])
def user_send_request(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

        try:
            room = Room.objects.get(roomnumber=data["roomnumber"])
        except:
            return JsonResponse({"error": "request a room not being created"}, status=403)
        try:
            requester = User.objects.get(id=data['userid'])
        except:
            return JsonResponse({"error": "user not exist"}, status=403)
            
        starttime = datetime.datetime.strptime(data['starttime'], '%Y-%m-%d %H:%M')
        endtime = datetime.datetime.strptime(data['endtime'], '%Y-%m-%d %H:%M')
        requesttime = datetime.datetime.strptime(data['requesttime'], '%Y-%m-%d %H:%M')
        room_request = Request.objects.create(name=data['eventname'], reason=data['reason'], requester=requester, room=room, starttime=starttime, endtime=endtime, requesttime=requesttime, repeat=data['repeat'])
        room_request.save()
        try:
         Request.objects.get(id=room_request.id)
         return JsonResponse({"eventname":data['eventname'],"requestid":room_request.id}, status=201)
        except:
            return JsonResponse({"error":"unable to create a room request"}, status=403)

# # TODO: Kiosk


