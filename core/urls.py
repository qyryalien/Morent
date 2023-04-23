from django.urls import path, include
from knox import views as knox_views
from . import views
from .views import *

urlpatterns = [
    path('', CarHome.as_view(), name='home'),
    path('category/<slug:cat_slug>/', CarCategory.as_view(), name='category'),
    path('steering/<slug:steering_slug>/', CarSteering.as_view(), name='steering'),
    path('capacity/<slug:capacity_slug>/', CarCapacity.as_view(), name='capacity'),
    path('post/<slug:car_slug>/', ShowCar.as_view(), name='car'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login1'),
    path('logout/', logout_user, name='logout'),
    path('profile/<slug:pk>/', Profile.as_view(), name='profile'),
    path('payment/<car>/', Payment.as_view(), name='payment'),
    path('profile/<slug:pk>/edit', ChangeUserData.as_view(), name='profile_edit'),
    path('profile/password_reset', views.password_reset_request, name='password_reset'),
    # API
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/send_password_reset_email/', SendChangePasswordEmailView,
         name='send_password_resel_email'),
    path('api/check_password_reset_token/', CheckChangePasswordTokenView.as_view(),
         name='check_password_reset_token'),
    path('api/profile/<pk>', UserRetrieveUpdateAPIView.as_view(), name='profile'),
]
