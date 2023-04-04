from django.urls import path
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
]
