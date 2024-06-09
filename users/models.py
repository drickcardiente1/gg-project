from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    USER_ROLES = (
        ('client', 'Client'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=USER_ROLES, default='client')
    profile_image = models.URLField(max_length=200, blank=True, null=True, default='https://res.cloudinary.com/devqjzqxb/image/upload/v1715779076/design3/pcqcgzowqxqbnc71cbz2.webp')
    profile_image_api_key = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username
    
    class Meta:
        unique_together = ('username',)

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = 'admin'
        else:
            self.role = 'client'
        super().save(*args, **kwargs)