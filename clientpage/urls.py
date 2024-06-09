from django.urls import path
from django.conf import settings
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('categories/', views.categories, name='categories'),
    path('user/<int:id>/book/<int:room_id>', views.book, name='book'),
    path('my-bookings/', views.mybookings, name='mybookings'),
    path('my-bookings/<int:id>/', views.mybookingsedit, name='mybookings_edit'),
    path('my-notifications/', views.all_notifications_view, name='my_notifications'),
    path('my-notifications/data/', views.notifications_data, name='my_notification_data'),
    path('my-notifications/update/<int:id>/', views.notifications_update, name='my_notification_update'),
    path('profile/', views.profile, name='profile'),
    path('sign-in/', views.signin, name='sign_in'),
    path('sign-up/', views.signup, name='sign_up'),
    path('sign_out/', views.sign_out, name='sign_out'),
]