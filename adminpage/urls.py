from django.urls import path
from django.conf import settings
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.signin, name='sign-in'),
    path('my-profile/', views.my_profile, name='my_profile'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('users/', views.users, name='users'),
    path('users/<int:id>/', views.edituser, name='edit_users'),
    path('users/add/', views.addusers, name='add_user'),
    path('users/remove/<int:id>/', views.removeuser, name='users_remove'),
    path('rooms/', views.rooms, name='rooms'),
    path('rooms/<int:id>/', views.edit_room, name='edit_room'),
    path('rooms/romove/<int:id>/', views.room_remove, name='room_remove'),
    path('rooms/upload_image/<int:id>/', views.upload_image, name='upload_image'),
    path('rooms/gallery/<int:room_id>/set/<int:image_id>', views.image_setdefault, name='image_setdefault'),
    path('rooms/gallery/<int:room_id>/remove/<int:image_id>', views.image_remove, name='image_remove'),
    path('rooms/add/', views.create_room, name='add_room'),
    path('bookings/', views.bookings, name='bookings'),
    path('bookings/<int:id>/', views.bookings_edit, name='bookings_edit'),
    path('bookings/remove/<int:id>/', views.bookings_remove, name='bookings_remove'),
    path('logout/', views.logout, name='logout'),
    path('notifications/', views.all_notifications_view, name='all_notifications'),
    path('notifications/data/', views.notifications_data, name='notifications_data'),
    path('notifications/update/<int:id>/', views.notifications_update, name='notifications_update'),
    path('notifications/add/', views.notify, name='notifications_add'),
]