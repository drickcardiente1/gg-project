from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm
from rooms.models import Room
from bookings.models import Booking

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('id', 'username', 'email', 'role', 'profile_image', 'profile_image_api_key', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password', 'role', 'profile_image', 'profile_image_api_key')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'role', 'profile_image', 'profile_image_api_key', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}
        ),
    )
    search_fields = ('username', 'email', 'role')
    ordering = ('username',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'room', 'user', 'date_start', 'date_end', 'days_occupied', 'total_price', 'status', 'date_booked')
    list_filter = ('status', 'date_start', 'date_end', 'date_booked', 'room', 'user')
    search_fields = ('room__room_name', 'user__username', 'date_start', 'date_end')
