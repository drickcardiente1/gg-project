from django.db import models
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
from rooms.models import Room

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('canceled', 'Canceled'),
        ('checked_in', 'Checked in'),
        ('checked_out', 'Checked Out'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date_start = models.DateField()
    date_end = models.DateField()
    days_occupied = models.IntegerField(blank=True, null=True)  
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    date_booked = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')  # Default set to 'pending'

    def __str__(self):
        return f"Booking for {self.room.room_name} by {self.user.username} from {self.date_start} to {self.date_end} - Total Price: {self.total_price}"

    def save(self, *args, **kwargs):
        # Ensure date_end is after date_start
        if self.date_start and self.date_end and self.date_start > self.date_end:
            raise ValueError("End date must be after start date")
        if self.room and self.days_occupied is not None:
            self.total_price = self.days_occupied * self.room.daily_rate
        super().save(*args, **kwargs)