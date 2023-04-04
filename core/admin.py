from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import *
# Register your models here.


class CarAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'get_html_photo', 'is_published')
    fields = ('title', 'slug', 'gasoline', 'rent_count', 'cat', 'engine', 'capacity', 'price', 'main_photo',
              'inside_photo_one', 'inside_photo_two', 'get_html_photo', 'is_published')
    search_fields = ('title',)
    list_editable = ('is_published',)
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ('get_html_photo',)
    save_on_top = True

    def get_html_photo(self, object):
        if object.main_photo:
            return mark_safe(f"<img src='{object.main_photo.url}'width=50>")

    get_html_photo.short_description = "Фото"


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    prepopulated_fields = {"slug": ("name",)}


class SteeringAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    prepopulated_fields = {"slug": ("name",)}


class CapacityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(Car, CarAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Steering, SteeringAdmin)
admin.site.register(Capacity, CapacityAdmin)