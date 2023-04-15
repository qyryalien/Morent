from django.db.models import Count
from django.shortcuts import render

from .models import *


class DataMixin:
    """A class for passing context to the page template."""
    paginate_by = 6

    def get_user_context(self, **kwargs):
        """Method that passes the context such as: machine categories and filter by selected category"""
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
