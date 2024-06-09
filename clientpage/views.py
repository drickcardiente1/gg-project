from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as django_logout
from django.db.models import Q
from django.utils import timezone
from users.forms import CustomAuthenticationForm, CustomUserSignupForm, EditUserForm
from users.models import CustomUser
from bookings.models import Booking
from rooms.models import Room
from bookings.forms import BookingUpdateForm2
import json
from datetime import datetime
from django.utils import timezone
import cloudinary.uploader
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from Notification.models import Notification

def home(req):
    return render(req, 'client-templates/home.html')


def categories(request):
    start = ''
    end = ''
    available_rooms = None
    if request.method == 'POST':
        start_date = request.POST.get('startDate')
        end_date = request.POST.get('endDate')
        start = start_date
        end = end_date
        if start_date and end_date:
            # Filter bookings with status canceled or checked out
            booked_rooms = Booking.objects.filter(
                Q(date_start__lte=end_date, date_end__gte=start_date),
                Q(status='confirmed') | Q(status='occupied')
            ).values_list('room_id', flat=True)
            available_rooms = Room.objects.exclude(id__in=booked_rooms).prefetch_related('images')
    # Return the rendered template with context
    return render(request, 'client-templates/categories.html', {
        'start': start,
        'end': end,
        'available_rooms': available_rooms,
    })

@login_required(login_url='/sign-in/')
def book(request, id, room_id):
    if request.method == 'POST':
        user = get_object_or_404(CustomUser, id=id)
        room = get_object_or_404(Room, id=room_id)
        data = json.loads(request.body)
        start_date_str = data.get('start_date')
        end_date_str = data.get('end_date')
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        difference_in_days = (end_date - start_date).days
        daily_rate = room.daily_rate
        total_price = daily_rate * difference_in_days
        Booking.objects.create(
            user=user,
            room=room,
            date_start=start_date,
            date_end=end_date,
            days_occupied=difference_in_days,
            total_price=total_price,
            status='pending',
            date_booked=timezone.now()
        )
        return JsonResponse({'status': 202})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

def signin(req):
    if req.user.is_authenticated:
        return redirect('home')
    else:
        if req.method == 'POST':
            form = CustomAuthenticationForm(req, req.POST)
            if form.is_valid():
                username = form.cleaned_data['username']
                password = form.cleaned_data['password']
                user = authenticate(req, username=username, password=password)
                if user is not None:
                    if user.role == 'client':
                        login(req, user)
                        return redirect('/')
                    elif user.role == 'admin':
                        login(req, user)
                        return redirect('/admin/dashboard')
                    else:
                        error_message = 'Invalid username or password.'
                        return render(req, 'client-templates/Sign-in.html', {'form': form, 'error_message': error_message})
                else:
                    error_message = 'Invalid username or password.'
                    return render(req, 'client-templates/Sign-in.html', {'form': form, 'error_message': error_message})
            else:
                error_message = 'Invalid username or password.'
                return render(req, 'client-templates/Sign-in.html', {'form': form, 'error_message': error_message})
        else:
            form = CustomAuthenticationForm()
    return render(req, 'client-templates/Sign-in.html', {'form': form})

def signup(request):
    if request.user.is_authenticated:
        return redirect('home')
    error_message = None
    if request.method == 'POST':
        form = CustomUserSignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
        else:
            error_message = "Please correct the errors below."
    else:
        form = CustomUserSignupForm()
    
    return render(request, 'client-templates/Sign-up.html', {'form': form, 'error_message': error_message})

@login_required(login_url='/sign-in/')
def sign_out(req):
    django_logout(req)
    return redirect('/')

@login_required(login_url='/sign-in/')
def profile(req):
    user = CustomUser.objects.get(pk=req.user.id)
    api = user.profile_image_api_key
    if req.method == 'POST':
        form = EditUserForm(req.POST, instance=user)
        if form.is_valid():
            img = req.FILES
            if img:
                if api:
                    cloudinary.api.delete_resources(api)
                profile_image = req.FILES['profile_image']
                result = cloudinary.uploader.upload(profile_image)
                profile_image_url = result['secure_url']
                profile_image_key = result['public_id']
                new_user = form.save(commit=False)
                new_user.profile_image = profile_image_url
                new_user.profile_image_api_key = profile_image_key
                new_user.save()
            else:
                messages.success(req, 'Profile Updated Successfully!')
                form.save()
            return redirect('/profile/')
    else:
        form = EditUserForm(instance=user)
    context = {'user': user, 'form': form}
    return render(req, 'client-templates/profile.html', context)

@login_required(login_url='/sign-in/')
def mybookings(req):
    bookings = Booking.objects.filter(user = req.user.id)
    return render(req, 'client-templates/bookings.html', {'bookings': bookings})

@login_required(login_url='/sign-in/')
def mybookingsedit(req, id):
    booking = get_object_or_404(Booking, pk=id)
    if req.method == 'POST':
        form = BookingUpdateForm2(req.POST, instance=booking)
        if form.is_valid():
            form.save()
            return redirect('/my-bookings/')
    else:
        form = BookingUpdateForm2(instance=booking)
    return render(req, 'client-templates/edit-bookings.html', {'form': form, 'booking': booking})

@login_required(login_url='/sign-in/')
def all_notifications_view(req):
    notifications = Notification.objects.filter(user=req.user).order_by('-timestamp')
    return render(req, 'client-templates/notifications.html', {'notifications': notifications})

@login_required(login_url='/sign-in/')
def notifications_data(req):
    notifications = Notification.objects.filter(user=req.user).order_by('-timestamp')
    notification_data = [{'id': obj.pk,
                          'message': obj.message,
                          'timestamp': obj.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                          'is_read_cleint': obj.is_read_cleint}
                          for obj in notifications]
    return JsonResponse({'data': notification_data})

@login_required(login_url='/sign-in/')
def notifications_update(req, id):
    try:
        notification = Notification.objects.get(pk=id)
        notification.is_read_cleint = True
        notification.save()
        notifications = Notification.objects.filter(user=req.user).order_by('-timestamp')
        notification_data = [{'id': obj.pk,
                          'message': obj.message,
                          'timestamp': obj.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                          'is_read_cleint': obj.is_read_cleint}
                          for obj in notifications]
        return JsonResponse({'data': notification_data})
    except Notification.DoesNotExist:
        return JsonResponse({'status': 404, 'message': 'Notification not found'})
