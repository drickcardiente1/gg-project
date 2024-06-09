from functools import wraps
from django.shortcuts import redirect
from django.urls import reverse

def admin_required(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.role == 'admin':
            return view_func(request, *args, **kwargs)
        else:
            return redirect('/admin')

    return wrapped_view