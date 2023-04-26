from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import INTERNAL_RESET_SESSION_TOKEN
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponseNotFound
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# API IMPORT
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView, RetrieveAPIView, CreateAPIView
import django_filters.rest_framework
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from core.serializers import *
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication


def pageNotFound(request, exception):
    """Viewer 404 page function"""
    return HttpResponseNotFound("Страница не найдена")


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_user(self, pk):
        obj = User.objects.get(pk=pk)
        return obj

    def retrieve(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(self.get_user(pk=kwargs.get("pk")))
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            message = {
                'detail': 'User getting error'
            }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_user(pk=kwargs.get("pk")), data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def SendChangePasswordEmailView(request):
    data = request.data
    email = data['email']
    user_list = User.objects.filter(email=email)
    if User.objects.filter(email=email).exists():
        for user in user_list:
            subject = "Password Reset Requested"
            email_template_name = "core/password/password_reset_email.txt"
            c = {
                "email": user.email,
                'domain': '127.0.0.1:8000',
                'site_name': 'Morent',
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "user": user,
                'token': default_token_generator.make_token(user),
                'protocol': 'http',
            }
            email = render_to_string(email_template_name, c)
            try:
                send_mail(subject, email, 'qyryalien@gmail.com', [user.email], fail_silently=False)
            except BadHeaderError:
                message = {
                    'detail': 'Some Error Message'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
            message = {
                'detail': 'Success Message'}
            return Response(message, status=status.HTTP_200_OK)
    else:
        message = {
            'detail': 'User with this email is not exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class CheckChangePasswordTokenView(generics.GenericAPIView):
    reset_url_token = "set-password"
    token_generator = default_token_generator
    serializer_class = ChangePasswordSerializer

    def post(self, request, *args, **kwargs):
        if kwargs.get("uidb64") is None or kwargs.get("token") is None:
            message = {
                'detail': 'The URL path must contain uidb64 and token parameters.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        user = self.get_user(kwargs.get("uidb64"))
        if user is not None:
            token = kwargs.get("token")
            if token == self.reset_url_token:
                session_token = self.request.session.get(INTERNAL_RESET_SESSION_TOKEN)
                if self.token_generator.check_token(user, session_token):
                    # If the token is valid, display the password reset form.
                    return Response(user.pk, status=status.HTTP_200_OK)
                else:
                    message = {
                        'detail': 'Token check unsuccessful'}
                    return Response(message, status=status.HTTP_400_BAD_REQUEST)
            else:
                if self.token_generator.check_token(user, token):
                    return Response(user.pk, status=status.HTTP_200_OK)
                else:
                    message = {
                        'detail': 'Token check unsuccessful'}
                    return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def get_user(self, uidb64):
        try:
            # urlsafe_base64_decode() decodes to bytestring
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (
                TypeError,
                ValueError,
                OverflowError,
                User.DoesNotExist,
                ValidationError,
        ):
            user = None
        return user


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User

    def update(self, request, *args, **kwargs):
        pk = self.kwargs.get("pk")
        if pk is not None:
            user = User.objects.get(pk=pk)
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check if password1 equal to password2
                if serializer.data.get("new_password") is not None:
                    if serializer.data.get("new_password") == serializer.data.get("new_password_confirm"):
                        # set_password also hashes the password that the user will get
                        user.set_password(serializer.data.get("new_password"))
                        user.save()
                        message = {
                            'detail': 'Password updated successfully'}
                        return Response(message, status=status.HTTP_200_OK)
                else:
                    message = {
                        'detail': 'Passwords not equal'}
                    return Response(message, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = {
                'detail': 'User id is None'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class CarListAPIView(ListAPIView):
    queryset = Car.objects.filter(is_published=True)
    serializer_class = CarListSerializer


class CarRetrieveAPIView(RetrieveAPIView):
    queryset = Car.objects.filter(is_published=True)
    serializer_class = CarSerializer


class CarFilterListAPIView(ListAPIView):
    serializer_class = CarListSerializer
    queryset = Car.objects.all()
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['cat', 'engine', 'capacity']


class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SteeringListAPIView(ListAPIView):
    queryset = Steering.objects.all()
    serializer_class = SteeringSerializer


class CapacityListAPIView(ListAPIView):
    queryset = Capacity.objects.all()
    serializer_class = CapacitySerializer


class OrderListAPIView(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.kwargs.get("pk")
        return Order.objects.filter(username_id=user)


class OrderCreateAPIView(CreateAPIView):
    serializer_class = OrderSerializer
