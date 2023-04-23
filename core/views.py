from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import SetPasswordForm, PasswordResetForm
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import LoginView, INTERNAL_RESET_SESSION_TOKEN
from django.core.mail import send_mail, BadHeaderError
from django.db.models import Q
from django.http import HttpResponseNotFound, request, HttpResponse
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views import View
from django.views.generic import ListView, CreateView, DetailView
from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .forms import RegisterUserForm, LoginUserForm, PaymentForm, ChangeUserDataForm
from .utils import *
from .models import *

# API

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, ChangePasswordSerializer
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication


# Create your views here.

class CarHome(DataMixin, ListView):
    """Viewer class for the home page"""
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    # test

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Главная страница")
        context['profile_name'] = self.request.user.pk
        return context | c_def

    def get_queryset(self):
        """Method that selects all published records from the Car model"""
        return Car.objects.filter(is_published=True).select_related('cat', 'engine', 'capacity')


class CarCategory(DataMixin, ListView):
    """Viewing class for the Category category page"""
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        """A method that selects all published records from the Car model, where the category is Category"""
        return Car.objects.filter(cat__slug=self.kwargs['cat_slug'], is_published=True).select_related('cat', 'engine',
                                                                                                       'capacity')

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c = Category.objects.get(slug=self.kwargs['cat_slug'])
        c_def = self.get_user_context(title="Категория - " + str(c.name),
                                      cat_selected=c.pk)
        context['profile_name'] = self.request.user.pk
        return context | c_def


class CarSteering(DataMixin, ListView):
    """Viewing class for the Steering category page"""
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        """A method that selects all published records from the Car model, where the category is Steering"""
        return Car.objects.filter(engine__slug=self.kwargs['steering_slug'], is_published=True).select_related('cat',
                                                                                                               'engine',
                                                                                                               'capacity')

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c = Steering.objects.get(slug=self.kwargs['steering_slug'])
        c_def = self.get_user_context(title="Двигатель - " + str(c.name),
                                      cat_selected=c.pk)
        context['profile_name'] = self.request.user.pk
        return context | c_def


class CarCapacity(DataMixin, ListView):
    """Viewing class for the Capacity category page"""
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        """A method that selects all published records from the Car model, where the category is Capacity"""
        return Car.objects.filter(capacity__slug=self.kwargs['capacity_slug'], is_published=True).select_related('cat',
                                                                                                                 'engine',
                                                                                                                 'capacity')

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c = Capacity.objects.get(slug=self.kwargs['capacity_slug'])
        c_def = self.get_user_context(title="Вместимость - " + str(c.name),
                                      cat_selected=c.pk)
        context['profile_name'] = self.request.user.pk
        return context | c_def


class ShowCar(DataMixin, DetailView):
    """Viewing class for the Auto page"""
    model = Car
    template_name = 'core/auto.html'
    slug_url_kwarg = 'car_slug'
    context_object_name = 'car'

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title=context['car'])
        context['profile_name'] = self.request.user.pk
        return context | c_def


class Payment(CreateView):
    """Viewing class for the Payment page"""
    form_class = PaymentForm
    success_url = reverse_lazy('home')
    template_name = 'core/payment.html'

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        """Method with the decorator, which requires user authorization for further work"""
        return super(Payment, self).dispatch(*args, **kwargs)

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        context['title'] = 'Payment'
        car_name = self.kwargs['car']
        if self.kwargs['car'] != 'auto':
            car = Car.objects.get(title=self.kwargs['car'])
            context['car_id'] = car.id
        context['car_name'] = car_name
        context['profile_name'] = self.request.user.pk
        c_def = context
        return context | c_def

    def form_valid(self, form):
        """Method that saves the results of the form as a record in the Order model"""
        print(form.cleaned_data)
        order = form.save(commit=False)
        order.username = self.request.user
        order.save()
        return redirect('home')


class RegisterUser(DataMixin, CreateView):
    """Viewing class for the user registration page"""
    form_class = RegisterUserForm
    template_name = 'core/register.html'
    success_url = reverse_lazy('login')

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Регистрация")
        return dict(list(context.items()) + list(c_def.items()))

    def form_valid(self, form):
        """Method that saves the results of the form as a record in the User model"""
        user = form.save()
        login(self.request, user)
        return redirect('home')


class LoginUser(DataMixin, LoginView):
    """Viewing class for the user login page"""
    form_class = LoginUserForm
    template_name = 'core/login.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Авторизация")
        return dict(list(context.items()) + list(c_def.items()))

    def get_success_url(self):
        """Method that redirects the user to the home page if the form is filled out correctly"""
        return reverse_lazy('home')


def logout_user(request):
    """Viewer function that de-authorizes the user"""
    logout(request)
    return redirect('login')


def pageNotFound(request, exception):
    """Viewer 404 page function"""
    return HttpResponseNotFound("Страница не найдена")


class Profile(DetailView):
    model = UserProfile
    template_name = "core/profile.html"
    context_object_name = 'profile'
    paginate_by = 5

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        context['title'] = 'Profile'
        context['orders'] = Order.objects.filter(username_id=self.request.user.pk).select_related('car')
        context['profile_name'] = self.request.user.pk
        c_def = context
        return context | c_def

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user).prefetch_related('user')


class ChangeUserData(View):
    form_class = ChangeUserDataForm
    success_url = reverse_lazy("profile")
    template_name = "core/change_user_data.html"

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        """Method with the decorator, which requires user authorization for further work"""
        return super(ChangeUserData, self).dispatch(*args, **kwargs)

    def get(self, *args, **kwargs):
        form = ChangeUserDataForm(instance=self.request.user)
        context = {'form': form, 'title': 'Edit profile', 'pk': self.kwargs['pk']}
        return render(self.request, 'core/change_user_data.html', context)

    def post(self, *args, **kwargs):
        form = ChangeUserDataForm(self.request.POST or None, instance=self.request.user)
        if form.is_valid():
            form.save()
            link_pk = self.kwargs['pk']
            link = f'/profile/{link_pk}/'
            return redirect(link)
        context = {'form': form, 'title': 'Edit profile', 'pk': self.kwargs['pk']}
        return render(self.request, 'core/change_user_data.html', context)


def password_reset_request(request):
    if request.method == "POST":
        password_reset_form = PasswordResetForm(request.POST)
        if password_reset_form.is_valid():
            data = password_reset_form.cleaned_data['email']
            associated_users = User.objects.filter(Q(email=data))
            if associated_users.exists():
                for user in associated_users:
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
                        return HttpResponse('Invalid header found.')
                    return redirect("/profile/password_reset/done/")
    password_reset_form = PasswordResetForm()
    return render(request=request, template_name="core/password/password_reset.html",
                  context={"password_reset_form": password_reset_form})


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

    def post(self, request, *args, **kwargs):
        data = request.data
        if "uidb64" not in data or "token" not in data:
            message = {
                'detail': 'The URL path must contain uidb64 and token parameters.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        user = self.get_user(data['uidb64'])
        if user is not None:
            token = data['token']
            if token == self.reset_url_token:
                session_token = self.request.session.get(INTERNAL_RESET_SESSION_TOKEN)
                if self.token_generator.check_token(user, session_token):
                    # If the token is valid, display the password reset form.
                    message = {
                        'detail': 'Token check success'}
                    return Response(message, status=status.HTTP_200_OK)
                else:
                    message = {
                        'detail': 'Token check unsuccessful'}
                    return Response(message, status=status.HTTP_400_BAD_REQUEST)
            else:
                if self.token_generator.check_token(user, token):
                    message = {
                        'detail': 'Token check success'}
                    return Response(message, status=status.HTTP_200_OK)
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

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check if password1 equal to password2
            if serializer.data.get("new_password") is not None:
                if serializer.data.get("new_password") == serializer.data.get("new_password_again"):
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
