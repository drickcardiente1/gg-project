from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from users.forms import CustomAuthenticationForm, CustomAddUserForm, EditUserForm
from django.contrib.auth.decorators import login_required
from users.decorators import admin_required
from users.models import CustomUser
from rooms.forms import RoomForm, RoomUpdateForm, UpdateRoomImageForm
from django.forms import modelformset_factory
from rooms.models import Room, RoomImage
from bookings.models import Booking
from bookings.forms import BookingUpdateForm
import cloudinary.uploader
from django.contrib import messages
from django.contrib.auth import logout as django_logout
from Notification.models import Notification
from Notification.forms import NotificationForm
from django.http import JsonResponse
from django.core.serializers import serialize
from django.db.models import F

def signin(req):
    if req.user.is_authenticated:
        return redirect('/admin/dashboard')
    else:
        if req.method == 'POST':
            form = CustomAuthenticationForm(req, req.POST)
            if form.is_valid():
                username = form.cleaned_data['username']
                password = form.cleaned_data['password']
                user = authenticate(req, username=username, password=password)
                if user is not None:
                    if user.role == 'admin':
                        login(req, user)
                        return redirect('/admin/dashboard')
                    else:
                        error_message = 'Invalid username or password.'
                        return render(req, 'admin-templates/Sign-in.html', {'form': form, 'error_message': error_message})
                else:
                    error_message = 'Invalid username or password.'
                    return render(req, 'admin-templates/Sign-in.html', {'form': form, 'error_message': error_message})
            else:
                error_message = 'Invalid username or password.'
                return render(req, 'admin-templates/Sign-in.html', {'form': form, 'error_message': error_message})
        else:
            form = CustomAuthenticationForm()
    return render(req, 'admin-templates/Sign-in.html', {'form': form})

@login_required(login_url='/admin')
@admin_required
def my_profile(req):
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
                form.save()
            return redirect('/admin/users/')
    else:
        form = EditUserForm(instance=user)
    context = {'user': user, 'form': form}
    return render(req, 'admin-templates/my-profile.html', context)

@login_required(login_url='/admin')
@admin_required
def dashboard(req):
    users = CustomUser.objects.filter(role = 'client')
    rooms = Room.objects.all()
    user_count = users.count()
    room_count = len(rooms)
    return render(req, 'admin-templates/home.html', {'user_count': user_count, 'room_count': room_count})

@login_required(login_url='/admin')
@admin_required
def users(req):
    users = CustomUser.objects.filter(role = 'client')
    return render(req, 'admin-templates/users.html', {'users': users})

@login_required(login_url='/admin')
@admin_required
def addusers(req):
    error_message = None
    if req.method == 'POST':
        form = CustomAddUserForm(req.POST)
        if form.is_valid():
            # Handle form processing
            username = form.cleaned_data['username']
            if CustomUser.objects.filter(username=username).exists():
                error_message = "Username already exists. Please choose a different username."
            else:
                img = req.FILES
                if img:
                    profile_image = req.FILES['profile_image']
                    result = cloudinary.uploader.upload(profile_image)
                    profile_image_url = result['secure_url']
                    profile_image_key = result['public_id']
                    new_user = form.save(commit=False)
                    new_user.profile_image = profile_image_url
                    new_user.profile_image_api_key = profile_image_key
                    new_user.save()
                else:
                    form.save()
                return redirect('/admin/users/')
        else:
            error_message = "Please correct the errors below."
    else:
        form = CustomAddUserForm()
    return render(req, 'admin-templates/add-user.html', {'form': form, 'error_message': error_message})

@login_required(login_url='/admin')
@admin_required
def removeuser(req, id):
    user = get_object_or_404(CustomUser, pk=id)
    if user.profile_image_api_key:
        cloudinary.api.delete_resources(user.profile_image_api_key)
    user.delete()
    return redirect('/admin/users/')

@login_required(login_url='/admin')
@admin_required
def edituser(req, id):
    user = CustomUser.objects.get(pk=id)
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
                form.save()
            return redirect('/admin/users/')
    else:
        form = EditUserForm(instance=user)
    context = {'user': user, 'form': form}
    return render(req, 'admin-templates/edit-user.html', context)

@login_required(login_url='/admin')
@admin_required
def rooms(req):
    rooms = Room.objects.all()
    room_data = []
    # Iterate through each room and fetch its images
    for room in rooms:
        # Fetch all images related to the current room
        images = RoomImage.objects.filter(room=room)
        
        # Prepare a list of image URLs for the current room
        image_urls = [image.image_url for image in images]

        # Append room data with images to the list
        room_data.append({
            'room': room,
            'image_urls': image_urls,
            'default_image': images.filter(is_default=True).first().image_url if images.filter(is_default=True).exists() else None
        })
    return render(req, 'admin-templates/rooms.html', {'room_data': room_data})

@login_required(login_url='/admin')
@admin_required
def edit_room(request, id):
    error_message = None
    room = get_object_or_404(Room, pk=id)
    galleries = RoomImage.objects.filter(room=room)
    default = ''
    for images in galleries:
        if images.is_default is True:
            default = images
    if request.method == 'POST':
        form = RoomUpdateForm(request.POST, instance=room)
        if form.is_valid():
            form.save()
            messages.success(request, 'Room and images updated successfully!')
            return redirect(f'/admin/rooms/{id}/')
        else:
            error_message = "There were errors in the form. Please correct them and try again."
    else:
        form = RoomUpdateForm(instance=room)
    context = {
        'room': room,
        'form': form,
        'error_message': error_message,
        'galleries':galleries,
        'default':default
    }
    return render(request, 'admin-templates/edit-room.html', context)


@login_required(login_url='/admin')
@admin_required
def upload_image(req, id):
    room = get_object_or_404(Room, pk=id)
    if req.method == 'POST':
        img = req.FILES['images']
        if img:
            for image in req.FILES.getlist('images'):
                result = cloudinary.uploader.upload(image)
                image_url = result['secure_url']
                image_key = result['public_id']
                RoomImage.objects.create(
                    room=room,
                    image_url=image_url,
                    is_default=False,
                    apikey=image_key
                )
                messages.success(req, 'Images Uploaded Successfully!')
    return redirect(f'/admin/rooms/{id}/')


@login_required(login_url='/admin')
@admin_required
def image_setdefault(req, room_id, image_id):
    room = get_object_or_404(Room, pk=room_id)
    image = get_object_or_404(RoomImage, room=room, id = image_id)
    image.is_default = True
    image.save()
    messages.success(req, 'Images Updated Successfully!')
    return redirect(f'/admin/rooms/{room_id}/')

@login_required(login_url='/admin')
@admin_required
def room_remove(req, id):
    room = get_object_or_404(Room, pk=id)
    images = RoomImage.objects.filter(room=room)
    for image in images:
        cloudinary.api.delete_resources(image.apikey)
    room.delete()
    return redirect(f'/admin/rooms/')

@login_required(login_url='/admin')
@admin_required
def image_remove(req, room_id, image_id):
    room = get_object_or_404(Room, pk=room_id)
    image = get_object_or_404(RoomImage, room=room, id=image_id)
    cloudinary.api.delete_resources(image.apikey)
    image.delete()
    messages.success(req, 'Image removed successfully!')
    return redirect(f'/admin/rooms/{room_id}/')

@login_required(login_url='/admin')
@admin_required
def create_room(request):
    error_message = None
    if request.method == 'POST':
        room_form = RoomForm(request.POST)
        if room_form.is_valid():
            room_form.save()
            return redirect('/admin/rooms/')
        else:
            error_message = "There were errors in the form. Please correct them and try again."
    else:
        room_form = RoomForm()    
    return render(request, 'admin-templates/create_room.html', {
        'room_form': room_form,
        'error_message': error_message
    })

@login_required(login_url='/admin')
@admin_required
def bookings(request):
    bookings = Booking.objects.all()
    return render(request, 'admin-templates/bookings.html', {'bookings': bookings})

@login_required(login_url='/admin')
@admin_required
def bookings_edit(request, id):
    booking = get_object_or_404(Booking, pk=id)
    if request.method == 'POST':
        form = BookingUpdateForm(request.POST, instance=booking)
        if form.is_valid():
            form.save()
            return redirect('/admin/bookings/')
    else:
        form = BookingUpdateForm(instance=booking)
    return render(request, 'admin-templates/edit-booking.html', {'form': form, 'booking': booking})

@login_required(login_url='/admin')
@admin_required
def bookings_remove(request, id):
    booking = get_object_or_404(Booking, pk=id)
    booking.delete()
    return redirect('/admin/bookings/')

@login_required(login_url='/admin')
@admin_required
def logout(request):
    django_logout(request)
    return redirect('/admin/')

@login_required(login_url='/admin')
@admin_required
def all_notifications_view(req):
    notifications = Notification.objects.all().order_by('-timestamp')
    return render(req, 'admin-templates/notifications.html', {'notifications': notifications})

@login_required(login_url='/admin')
@admin_required
def notifications_data(req):
    notifications = Notification.objects.all().order_by('-timestamp')
    notification_data = [{'id': obj.pk,
                          'user': {'id':obj.user.pk, 'username':obj.user.username, 'email':obj.user.email,'profile_image':obj.user.profile_image},
                          'message': obj.message,
                          'timestamp': obj.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                          'is_read_admin': obj.is_read_admin,
                          'is_read_cleint': obj.is_read_cleint}
                          for obj in notifications]
    return JsonResponse({'data': notification_data})

@login_required(login_url='/admin')
@admin_required
def notifications_update(req, id):
    try:
        notification = Notification.objects.get(pk=id)
        notification.is_read_admin = True
        notification.save()
        notifications = Notification.objects.all().order_by('-timestamp')
        notification_data = [{'id': obj.pk,
                          'user': {'id':obj.user.pk, 'username':obj.user.username, 'email':obj.user.email,'profile_image':obj.user.profile_image},
                          'message': obj.message,
                          'timestamp': obj.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                          'is_read_admin': obj.is_read_admin,
                          'is_read_cleint': obj.is_read_cleint} 
                          for obj in notifications]
        return JsonResponse({'data': notification_data})
    except Notification.DoesNotExist:
        return JsonResponse({'status': 404, 'message': 'Notification not found'})

@login_required(login_url='/admin')
@admin_required
def notify(req):
    if req.method == 'POST':
        form = NotificationForm(req.POST)
        if form.is_valid():
            form.save()
            return redirect('/admin/notifications/add/')
    else:
        form = NotificationForm()
    return render(req, 'admin-templates/notify.html', {'form': form})