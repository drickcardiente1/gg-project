from django import forms
from .models import Notification
from django.utils import timezone

class NotificationForm(forms.ModelForm):
    class Meta:
        model = Notification
        fields = ['user', 'message']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['user'].required = True
        self.fields['message'].required = True

        self.fields['user'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'User',
            'aria-label': 'User'
        })
        self.fields['message'].widget = forms.Textarea(attrs={
            'class': 'form-control',
            'placeholder': 'Message',
            'aria-label': 'Message',
            'rows': 4  # You can adjust the number of rows as needed
        })

    def save(self, commit=True):
        notification = super().save(commit=False)
        notification.timestamp = timezone.now()
        notification.is_read_admin = True
        notification.is_read_client = False
        if commit:
            notification.save()
        return notification