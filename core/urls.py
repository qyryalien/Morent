from django.urls import path

from . import views
from .views import *

urlpatterns = [
    path('', CarHome.as_view(), name='home'),
    path('category/<slug:cat_slug>/', CarCategory.as_view(), name='category'),
    path('steering/<slug:steering_slug>/', CarSteering.as_view(), name='steering'),
    path('capacity/<slug:capacity_slug>/', CarCapacity.as_view(), name='capacity'),
    path('post/<slug:car_slug>/', ShowCar.as_view(), name='car'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('logout/', logout_user, name='logout'),
    path('profile/<slug:pk>/', Profile.as_view(), name='profile'),
    path('payment/<car>/', Payment.as_view(), name='payment'),
    path('profile/<slug:pk>/edit', ChangeUserData.as_view(), name='profile_edit'),
    path('profile/password_reset', views.password_reset_request, name='password_reset'),
]
