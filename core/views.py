from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.http import HttpResponseNotFound, request
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.generic import ListView, CreateView, DetailView, FormView

from .forms import RegisterUserForm, LoginUserForm, PaymentForm
from .utils import *
from .models import *


# Create your views here.

class CarHome(DataMixin, ListView):
    """Viewer class for the home page"""
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Главная страница")
        return context | c_def

    def get_queryset(self):
        """Method that selects all published records from the Car model"""
        return Car.objects.filter(is_published=True).select_related('cat')


class CarCategory(DataMixin, ListView):
    """Viewing class for the Category category page"""
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        """A method that selects all published records from the Car model, where the category is Category"""
        return Car.objects.filter(cat__slug=self.kwargs['cat_slug'], is_published=True).select_related('cat')

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c = Category.objects.get(slug=self.kwargs['cat_slug'])
        c_def = self.get_user_context(title="Категория - " + str(c.name),
                                      cat_selected=c.pk)
        return context | c_def


class CarSteering(DataMixin, ListView):
    """Viewing class for the Steering category page"""
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        """A method that selects all published records from the Car model, where the category is Steering"""
        return Car.objects.filter(engine__slug=self.kwargs['steering_slug'], is_published=True).select_related('cat')

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c = Steering.objects.get(slug=self.kwargs['steering_slug'])
        c_def = self.get_user_context(title="Двигатель - " + str(c.name),
                                      cat_selected=c.pk)
        return context | c_def


class CarCapacity(DataMixin, ListView):
    """Viewing class for the Capacity category page"""
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        """A method that selects all published records from the Car model, where the category is Capacity"""
        return Car.objects.filter(capacity__slug=self.kwargs['capacity_slug'], is_published=True).select_related('cat')

    def get_context_data(self, *, object_list=None, **kwargs):
        """Method that passes the context"""
        context = super().get_context_data(**kwargs)
        c = Capacity.objects.get(slug=self.kwargs['capacity_slug'])
        c_def = self.get_user_context(title="Вместимость - " + str(c.name),
                                      cat_selected=c.pk)
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
        context['car'] = self.kwargs['car']
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
