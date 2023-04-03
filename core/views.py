from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView
from django.http import HttpResponseNotFound
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView

from .forms import RegisterUserForm, LoginUserForm
from .utils import *
from .models import *


# Create your views here.

class CarHome(DataMixin, ListView):
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Главная страница")
        return context | c_def

    def get_queryset(self):
        return Car.objects.filter(is_published=True).select_related('cat')


class CarCategory(DataMixin, ListView):
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        return Car.objects.filter(cat__slug=self.kwargs['cat_slug'], is_published=True).select_related('cat')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c = Category.objects.get(slug=self.kwargs['cat_slug'])
        c_def = self.get_user_context(title="Категория - " + str(c.name),
                                      cat_selected=c.pk)
        return context | c_def


class CarSteering(DataMixin, ListView):
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        return Car.objects.filter(engine__slug=self.kwargs['steering_slug'], is_published=True).select_related('cat')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c = Steering.objects.get(slug=self.kwargs['steering_slug'])
        c_def = self.get_user_context(title="Двигатель - " + str(c.name),
                                      cat_selected=c.pk)
        return context | c_def


class CarCapacity(DataMixin, ListView):
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_queryset(self):
        return Car.objects.filter(capacity__slug=self.kwargs['capacity_slug'], is_published=True).select_related('cat')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c = Capacity.objects.get(slug=self.kwargs['capacity_slug'])
        c_def = self.get_user_context(title="Вместимость - " + str(c.name),
                                      cat_selected=c.pk)
        return context | c_def


class RegisterUser(DataMixin, CreateView):
    form_class = RegisterUserForm
    template_name = 'core/register.html'
    success_url = reverse_lazy('login')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Регистрация")
        return dict(list(context.items()) + list(c_def.items()))

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('home')


class LoginUser(DataMixin, LoginView):
    form_class = LoginUserForm
    template_name = 'core/login.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Авторизация")
        return dict(list(context.items()) + list(c_def.items()))

    def get_success_url(self):
        return reverse_lazy('home')


def logout_user(request):
    logout(request)
    return redirect('login')


def pageNotFound(request, exception):
    return HttpResponseNotFound("Страница не найдена")
