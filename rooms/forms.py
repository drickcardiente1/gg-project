from django import forms
from .models import Room, RoomImage
from django.utils import timezone

class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['room_name', 'description', 'daily_rate', 'max_occupancy']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Make all fields required
        self.fields['room_name'].required = True
        self.fields['description'].required = True
        self.fields['daily_rate'].required = True
        self.fields['max_occupancy'].required = True

        # Update widget attributes for existing fields
        field_attrs = {
            'class': 'form-control',
            'placeholder': '',
            'aria-label': ''
        }
        for field_name in ['room_name', 'description', 'daily_rate', 'max_occupancy']:
            self.fields[field_name].widget.attrs.update(field_attrs)

class RoomUpdateForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['room_name', 'description', 'daily_rate', 'max_occupancy']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['room_name'].required = False
        self.fields['description'].required = False
        self.fields['daily_rate'].required = False
        self.fields['max_occupancy'].required = False
        field_attrs = {
            'class': 'form-control',
            'placeholder': '',
            'aria-label': ''
        }
        for field_name in self.fields:
            self.fields[field_name].widget.attrs.update(field_attrs)

    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.date_updated = timezone.now()
        if commit:
            instance.save()
        return instance
    
class UpdateRoomImageForm(forms.ModelForm):
    class Meta:
        model = RoomImage
        fields = ['image_url', 'is_default', 'apikey']