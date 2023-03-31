from django.shortcuts import render
from django.views.generic import ListView

from .utils import *
from .models import *


# Create your views here.
def main(request):
    return render(request, 'core/index.html')


class CarHome(DataMixin, ListView):
    model = Car
    template_name = 'core/index.html'
    context_object_name = 'cars'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="Главная страница")
        return dict(list(context.items()) + list(c_def.items()))

    def get_queryset(self):
        return Car.objects.filter(is_published=True).select_related('cat')
