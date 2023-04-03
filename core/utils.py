from django.db.models import Count
from .models import *





class DataMixin:
    def get_user_context(self, **kwargs):
        context = kwargs
        cats = Category.objects.all()
        steer = Steering.objects.all()
        capas = Capacity.objects.all()
        context['cats'] = cats
        context['steer'] = steer
        context['capas'] = capas
        if 'cat_selected' not in context:
            context['cat_selected'] = 0
        return context
