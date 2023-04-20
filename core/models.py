from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse


# Create your models here.
class Car(models.Model):
    """Model for cars that we are going to rent out"""
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
        """Method for returning the absolute path by slug"""
        return reverse('car', kwargs={'car_slug': self.slug})


class Category(models.Model):
    """Model defining the category of the car"""
    name = models.CharField(max_length=50, db_index=True, verbose_name="Категория")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        """Method for returning the absolute path by slug"""
        return reverse('category', kwargs={'cat_slug': self.slug})


class Steering(models.Model):
    """Model defining the steering of the car"""
    name = models.CharField(max_length=50, db_index=True, verbose_name="Двигатель")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        """Method for returning the absolute path by slug"""
        return reverse('steering', kwargs={'steering_slug': self.slug})


class Capacity(models.Model):
    """Model defining the capacity of the car"""
    name = models.CharField(max_length=50, db_index=True, verbose_name="Вместимость")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        """Method for returning the absolute path by slug"""
        return reverse('capacity', kwargs={'capacity_slug': self.slug})


class UserProfile(models.Model):
    """Model for user profile"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')

    def __str__(self):
        return f'{self.user.username} Profile'


class Order(models.Model):
    """Model for user orders"""
    username = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="User name")
    name = models.CharField(max_length=50, verbose_name="Name")
    adress = models.CharField(max_length=100, verbose_name="Adress")
    phone_number = models.CharField(max_length=15, verbose_name="Phone number")
    city = models.CharField(max_length=50, verbose_name="City")
    pick_up_location = models.CharField(max_length=50, verbose_name="Pick-up location")
    pick_up_date = models.DateField(max_length=50, verbose_name="Pick-up date")
    pick_up_time = models.TimeField(max_length=50, verbose_name="Pick-up time")
    car = models.ForeignKey('Car', on_delete=models.PROTECT, verbose_name="Car")
    drop_off_location = models.CharField(max_length=50, verbose_name="Drop-off location")
    drop_off_date = models.DateField(max_length=50, verbose_name="Drop-off date")
    drop_off_time = models.TimeField(max_length=50, verbose_name="Drop-off time")
    card_number = models.CharField(max_length=15, verbose_name="Card number")
    expration_date = models.DateField(max_length=50, verbose_name="Expration date")
    card_holder = models.CharField(max_length=50, verbose_name="Card holder")
    cvc = models.IntegerField(verbose_name="CVC")
    confirmation_one = models.BooleanField(verbose_name="Confirmation one")
    confirmation_two = models.BooleanField(verbose_name="Confirmation two")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        """Method for returning the absolute path by slug"""
        return reverse('username', kwargs={'username': self.username})
