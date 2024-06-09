from django.db import models
from users.models import CustomUser
from django.utils import timezone


class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    timestamp = models.DateTimeField(default=timezone.now)
    is_read_admin = models.BooleanField(default=False)
    is_read_cleint = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.user.username} - {self.message}'
