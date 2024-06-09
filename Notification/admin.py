from django.contrib import admin
from .models import Notification

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'message', 'timestamp', 'is_read_admin', 'is_read_cleint')
    list_display_links = ('id',)

admin.site.register(Notification, NotificationAdmin)