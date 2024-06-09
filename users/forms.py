from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, UserChangeForm, PasswordChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = '__all__'

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = '__all__'

class CustomUserSignupForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'username', 'email', 'password1', 'password2')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        self.fields['username'].required = True
        self.fields['email'].required = True
        self.fields['password1'].required = True
        self.fields['password2'].required = True

        self.fields['first_name'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'First Name',
            'aria-label': 'First Name'
        })
        self.fields['last_name'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Last Name',
            'aria-label': 'Last Name'
        })
        self.fields['username'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Username',
            'aria-label': 'Username'
        })
        self.fields['email'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Email',
            'aria-label': 'Email'
        })
        self.fields['password1'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Password',
            'aria-label': 'Password'
        })
        self.fields['password2'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Confirm Password',
            'aria-label': 'Confirm Password'
        })

class CustomAddUserForm(UserCreationForm):
    profile_image = forms.ImageField(required=False, label='Profile Image')
    profile_image_api_key = forms.CharField(required=False, label='Profile Image API Key', max_length=255)
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'username', 'email', 'password1', 'password2', 'profile_image', 'profile_image_api_key')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        self.fields['username'].required = True
        self.fields['email'].required = True
        self.fields['password1'].required = True
        self.fields['password2'].required = True
        field_attrs = {
            'class': 'form-control',
            'placeholder': '',
            'aria-label': ''
        }
        for field_name in ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']:
            self.fields[field_name].widget.attrs.update(field_attrs)
        self.fields['profile_image'].widget.attrs.update({
            'class': 'form-control-file',
            'accept': 'image/*',
            'aria-label': 'Profile Image'
        })
        self.fields['profile_image_api_key'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Profile Image API Key',
            'aria-label': 'Profile Image API Key'
        })

class EditUserForm(forms.ModelForm):
    profile_image = forms.ImageField(required=False, label='Profile Image')
    profile_image_api_key = forms.CharField(required=False, label='Profile Image API Key', max_length=255)
    password1 = forms.CharField(label='New Password', widget=forms.PasswordInput, required=False)
    password2 = forms.CharField(label='Confirm New Password', widget=forms.PasswordInput, required=False)

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'username', 'email', 'profile_image', 'profile_image_api_key', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        self.fields['username'].required = True
        self.fields['email'].required = True

        # Update widget attributes for existing fields
        field_attrs = {
            'class': 'form-control',
            'placeholder': '',
            'aria-label': ''
        }
        for field_name in ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']:
            self.fields[field_name].widget.attrs.update(field_attrs)

        # Update widget attributes for profile_image field
        self.fields['profile_image'].widget.attrs.update({
            'class': 'form-control-file',
            'accept': 'image/*',
            'aria-label': 'Profile Image'
        })

        # Update widget attributes for profile_image_api_key field
        self.fields['profile_image_api_key'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Profile Image API Key',
            'aria-label': 'Profile Image API Key'
        })

    def clean_password2(self):
        # Validate password fields if both are provided
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match.")
        
        return password2

class CustomAuthenticationForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Enter your username',
            'aria-label': 'username'
        })
        self.fields['password'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Password',
            'aria-label': 'Password'
        })