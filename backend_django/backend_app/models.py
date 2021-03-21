from django.db import models
from django.contrib.auth.models import User

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,blank=False)
    adminID = models.CharField(max_length=100,blank=False)

class Group(models.Model):
    groupname = models.CharField(max_length=100,blank=False)
    groupcode = models.CharField(max_length=100,unique = True,blank=False) # automatically generated
    manager = models.ForeignKey(Admin, on_delete=models.CASCADE,blank=False)
    user = models.ManyToManyField(User)

class Room(models.Model):
    roomnumber = models.CharField(max_length=100,blank=False)
    group = models.ForeignKey(Group,blank=False,null=True,on_delete=models.SET_NULL)

class DailyCalendar(models.Model):
    date = models.DateField(blank=False)

class Event(models.Model):
    eventname = models.CharField(max_length=250,blank=False)
    room = models.ForeignKey(Room,blank=False,null=True,on_delete=models.SET_NULL)
    creator = models.ForeignKey(User,blank=False,null=True,on_delete=models.SET_NULL)
    # TODO: specify format, and default setting
    date = models.ForeignKey(DailyCalendar,blank=False,null=True,on_delete=models.SET_NULL)
    startime = models.TimeField(blank=False)  
    endtime = models.TimeField(blank=False)
     
    # TODO: add repeat later ('none/daily/weekly/monthly')
    # TODO: sorting method


class Request(models.Model):
    requester = models.ForeignKey(User,blank=False,null=True,on_delete=models.SET_NULL)
    room = models.ForeignKey(Room,blank=False,null=True,on_delete=models.SET_NULL)
    # TODO: specify format, and default setting 
    startime = models.TimeField(blank=False)  
    endtime = models.TimeField(blank=False)
    requesttime = models.TimeField(blank=False)
    repeat = models.CharField(max_length=10,default='none')  # TODO: whether using charfield would be appropriate
    processed = models.BooleanField(default=False)
    approved = models.BooleanField(default=False)
    conflict = models.ManyToManyField(Event)

