from django import forms
from .models import Booking

class BookingUpdateForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['status']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in self.fields.keys():
            self.fields[field_name].required = False
            if field_name != 'status':
                self.fields[field_name].widget.attrs.update({'class': 'form-control', 'disabled': 'disabled'})
            else:
                self.fields[field_name].widget.attrs.update({'class': 'form-control'})

class BookingUpdateForm2(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['status']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = kwargs.get('instance')
        if instance:
            current_status = instance.status
            # Set the choices to include only the current status and 'canceled'
            self.fields['status'].choices = [
                (current_status, current_status.capitalize()),
                ('canceled', 'Canceled')
            ]
            # Disable the current status option
            self.fields['status'].widget.attrs.update({'class': 'form-control'})
            self.fields['status'].widget.attrs.update({
                'class': 'form-control',
                'onchange': 'disableCurrentStatusOption()'
            })
            self.current_status_value = current_status

    def clean_status(self):
        status = self.cleaned_data.get('status')
        return status