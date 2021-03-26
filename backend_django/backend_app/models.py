from django.db import models
from django.contrib.auth.models import User

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,blank=False)
    # adminid = models.CharField(max_length=100,blank=False)

    def __str__(self):
        return str(self.user)

class Group(models.Model):
    groupname = models.CharField(max_length=100,blank=False,unique=True)
    groupcode = models.CharField(max_length=100,unique = True,blank=False) # automatically generated
    manager = models.ForeignKey(Admin, on_delete=models.CASCADE,blank=False)
    user = models.ManyToManyField(User, blank=True, null=True)
    
    def __str__(self):
        return self.groupname
    

class Room(models.Model):
    roomnumber = models.CharField(max_length=100,blank=False,unique=True)
    group = models.ForeignKey(Group, blank=False, null=True, on_delete=models.SET_NULL)
    
    def __str__(self):
        return self.roomnumber

class DailyCalendar(models.Model):
    date = models.DateField(blank=False, unique=True)
    
class Event(models.Model):
    eventname = models.CharField(max_length=250,blank=False)
    room = models.ForeignKey(Room,blank=False,null=True,on_delete=models.SET_NULL)
    creator = models.ForeignKey(Admin,blank=False,null=True,on_delete=models.SET_NULL)
    # TODO: specify format, and default setting
    date = models.ForeignKey(DailyCalendar,blank=True,null=True,on_delete=models.SET_NULL)
    starttime = models.DateTimeField(blank=False)  
    endtime = models.DateTimeField(blank=False)
    
    # TODO: add repeat later ('none/daily/weekly/monthly')
    # TODO: sorting method
    def __str__(self):
        return self.eventname


class Request(models.Model):
    name = models.CharField(max_length=250, blank=True,null=True)
    reason = models.TextField(blank=True,null=True)
    requester = models.ForeignKey(User,blank=False,null=True,on_delete=models.SET_NULL)
    room = models.ForeignKey(Room,blank=False,null=True,on_delete=models.SET_NULL)
    # TODO: specify format, and default setting 
    starttime = models.DateTimeField (blank=False)  
    endtime = models.DateTimeField (blank=False)
    requesttime = models.DateTimeField (blank=False)
    repeat = models.CharField(max_length=10,default='none')  # TODO: whether using charfield would be appropriate
    processed = models.BooleanField(default=False)
    approved = models.BooleanField(default=False)
    conflict = models.ManyToManyField(Event, blank=True, null=True)
    
    def __str__(self):
        return self.name

