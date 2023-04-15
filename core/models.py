from django.conf import settings
from django.contrib.auth.models import User
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
    rent_count = models.IntegerField(verbose_name="Количество аренд")
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


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name='uploaded_by')
    names = models.CharField(max_length=40)
    lastname = models.CharField(max_length=50)
    email = models.EmailField()


class Order(models.Model):
    username = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="username")
    name = models.CharField(max_length=50, verbose_name="name")
    adress = models.CharField(max_length=100, verbose_name="adress")
    phone_number = models.IntegerField(verbose_name="phone_number")
    city = models.CharField(max_length=50, verbose_name="city")
    pick_up_location = models.CharField(max_length=50, verbose_name="pick_up_location")
    pick_up_date = models.DateField(max_length=50, verbose_name="pick_up_date")
    pick_up_time = models.TimeField(max_length=50, verbose_name="pick_up_time")
    car = models.CharField(null=True, blank=True, max_length=50, verbose_name="car")
    drop_off_location = models.CharField(max_length=50, verbose_name="drop_off_location")
    drop_off_date = models.DateField(max_length=50, verbose_name="drop_off_date")
    drop_off_time = models.TimeField(max_length=50, verbose_name="drop_off_time")
    card_number = models.IntegerField(verbose_name="card_number")
    expration_date = models.CharField(max_length=50, verbose_name="expration_date")
    card_holder = models.CharField(max_length=50, verbose_name="card_holder")
    cvc = models.IntegerField(verbose_name="cvc")
    confirmation_one = models.BooleanField(verbose_name="confirmation_one")
    confirmation_two = models.BooleanField(verbose_name="confirmation_two")

    def __str__(self):
        return self.name
