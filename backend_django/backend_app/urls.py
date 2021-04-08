from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.login, name="login"),
    path('signup/', views.signup, name="signup"),
    path('admin/create_group/', views.admin_create_group, name="admin_create_group"),
    path('admin/add_room/', views.admin_add_room, name="admin_add_room"),
    path('admin/requests/view/', views.admin_view_requests, name="admin_view_requests"),
    path('admin/requests/process/', views.admin_process_request, name="admin_process_request"),
    path('admin/events/create/', views.admin_create_events, name="admin_create_events"),
    path('admin/events/view/', views.admin_view_events, name="admin_view_events"),
    path('admin/events/edit/',views.admin_edit_event, name="admin_edit_event"),
    path('user/join_group/', views.user_join_group, name="user_join_group"),
    path('user/rooms/', views.user_view_rooms, name="user_view_rooms"),
    path('user/request/', views.user_send_request, name="user_request"),
]