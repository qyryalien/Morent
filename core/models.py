from django.db import models
from django.urls import reverse


# Create your models here.
class Car(models.Model):
    title = models.CharField(max_length=50, verbose_name="Название машины")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    main_photo = models.ImageField(upload_to="photos/%Y/%m/%d/", verbose_name="Фото cо стороны")
    inside_photo_one = models.ImageField(upload_to="photos/%Y/%m/%d/", verbose_name="Первое фото внутри")
    inside_photo_two = models.ImageField(upload_to="photos/%Y/%m/%d/", verbose_name="Второе фото внутри")
    is_published = models.BooleanField(default=True, verbose_name="Публикация")
    gasoline = models.IntegerField(verbose_name="Обьем топливного бака")
    rent_count = models.IntegerField( verbose_name="Количество аренд")
    price = models.CharField(max_length=50, verbose_name="Цена")

    cat = models.ForeignKey('Category', on_delete=models.PROTECT, verbose_name="Категория")
    engine = models.ForeignKey('Steering', on_delete=models.PROTECT, verbose_name="Двигатель")
    capacity = models.ForeignKey('Capacity', on_delete=models.PROTECT, verbose_name="Вместимость")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('car', kwargs={'car_slug': self.slug})


class Category(models.Model):
    name = models.CharField(max_length=50, db_index=True, verbose_name="Категория")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category', kwargs={'cat_slug': self.slug})


class Steering(models.Model):
    name = models.CharField(max_length=50, db_index=True, verbose_name="Двигатель")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('steering', kwargs={'steering_slug': self.slug})


class Capacity(models.Model):
    name = models.CharField(max_length=50, db_index=True, verbose_name="Вместимость")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('capacity', kwargs={'capacity_slug': self.slug})