from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.login, name="login"),
    path('signup/', views.signup, name="signup"),
    path('admin/create_group/', views.admin_create_group, name="admin_create_group"),
    path('admin/add_room/', views.admin_add_room, name="add_room"),
]