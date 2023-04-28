from django.urls import path, include
from knox import views as knox_views
from core.views import *

urlpatterns = [
    # API
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/password_reset/<pk>', ChangePasswordView.as_view(), name='password_reset'),
    path('api/send_password_reset_email/', SendChangePasswordEmailView,
         name='send_password_resel_email'),
    path('api/check_password_reset_token/<uidb64>/<token>', CheckChangePasswordTokenView.as_view(),
         name='check_password_reset_token'),
    path('api/profile/<pk>', UserRetrieveUpdateAPIView.as_view(), name='profile'),
    path('api/', CarListAPIView.as_view(), name='home'),
    path('api/car/<pk>', CarRetrieveAPIView.as_view(), name='home'),
    path('api/filter/', CarFilterListAPIView.as_view(), name='filter'),
    path('api/profile/<pk>/orders', OrderListAPIView.as_view(), name='orders'),
    path('api/payment/', OrderCreateAPIView.as_view(), name='payment'),
    path('api/all_category/', AllCategoryListAPIView.as_view(), name='all_category')
]
