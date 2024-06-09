from django.db import models

class Room(models.Model):
    room_name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    max_occupancy = models.IntegerField()

    def __str__(self):
        return self.room_name

class RoomImage(models.Model):
    room = models.ForeignKey(Room, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField(max_length=200)
    is_default = models.BooleanField(default=False)
    apikey = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.room.room_name} - {self.image_url}"

    def save(self, *args, **kwargs):
        if self.is_default:
            # Ensure only one image per room is set as default
            RoomImage.objects.filter(room=self.room, is_default=True).exclude(pk=self.pk).update(is_default=False)
            self.room.default_image = self.image_url
            self.room.save()
        super().save(*args, **kwargs)
        if not self.is_default:
            old_instance = self.__class__.objects.filter(pk=self.pk).first()
            if old_instance and old_instance.is_default != self.is_default:
                self.room.default_image = None
                self.room.save()