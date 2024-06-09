from django.contrib import admin
from .models import Room, RoomImage

class ImageInline(admin.TabularInline):
    model = RoomImage
    extra = 1  # Number of extra forms to show

class RoomAdmin(admin.ModelAdmin):
    inlines = [ImageInline]
    list_display = ('id', 'room_name', 'description', 'daily_rate', 'date_created', 'date_updated', 'max_occupancy')

class RoomImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'room', 'image_url', 'is_default', 'apikey')

admin.site.register(Room, RoomAdmin)
admin.site.register(RoomImage, RoomImageAdmin)
