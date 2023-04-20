from django.conf import settings
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm
from django.contrib.auth.models import User
from django import forms
from django.core.exceptions import ValidationError

from core.models import Order, Car


class PaymentForm(forms.ModelForm):
    """Form for Order model"""

    class Meta:
        model = Order
        car = forms.ModelChoiceField(
            queryset=Car.objects.all(),
            to_field_name='title',
        )
        fields = ['name', 'adress',
                  'phone_number', 'city', 'pick_up_location',
                  'pick_up_date', 'pick_up_time', 'car',
                  'drop_off_location', 'drop_off_date', 'drop_off_time',
                  'card_number', 'expration_date', 'card_holder',
                  'cvc', 'confirmation_one', 'confirmation_two']
        widgets = {
            'name': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Your name'}),
            'adress': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Your adress'}),
            'phone_number': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Your phone number'}),
            'city': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Your town / city'}),
            'pick_up_location': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Select your location'}),
            'pick_up_date': forms.DateInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'DD/MM/YY'}),
            'pick_up_time': forms.TimeInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Enter your time'}),
            'drop_off_location': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Select your location'}),
            'drop_off_date': forms.DateInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'DD/MM/YY'}),
            'drop_off_time': forms.TimeInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Enter your time'}),
            'card_number': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Card Number'}),
            'expration_date': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'DD/MM/YY'}),
            'card_holder': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Card Holder'}),
            'cvc': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'CVC'}),
            'car': forms.Select(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Your car'}),

        }

    def clean_phone_number(self):
        """A method for checking if the phone_number field is entered correctly"""
        phone_number = self.cleaned_data['phone_number']
        print(phone_number)
        if len(phone_number) != 12:
            raise ValidationError('The length of the phone number must be 12.')
        return phone_number

    def clean_card_number(self):
        """A method for checking if the card_number field is entered correctly"""
        card_number = self.cleaned_data['card_number']
        print(card_number)
        if len(card_number) != 12:
            raise ValidationError('The length of the card number must be 12.')
        return card_number

    def clean_cvc(self):
        """A method for checking if the cvc field is entered correctly"""
        cvc = self.cleaned_data['cvc']
        print(cvc)
        a_string = str(cvc)
        if len(a_string) != 3:
            raise ValidationError('The length of the cvc must be 3.')
        return cvc

    def clean_name(self):
        name = self.cleaned_data['name']
        print(name)
        if len(name) < 2:
            raise ValidationError('Name less then 2')
        return name

    def clean_adress(self):
        adress = self.cleaned_data['adress']
        print(adress)
        if len(adress) < 2:
            raise ValidationError('Name less then 2')
        return adress

    def clean_city(self):
        city = self.cleaned_data['city']
        print(city)
        if len(city) < 2:
            raise ValidationError('Name less then 2')
        return city

    def clean_pick_up_location(self):
        p_l = self.cleaned_data['pick_up_location']
        print(p_l)
        if len(p_l) < 2:
            raise ValidationError('Name less then 2')
        return p_l

    def clean_pick_up_date(self):
        p_d = self.cleaned_data['pick_up_date']
        print(p_d)
        if not p_d:
            raise ValidationError('Name less then 2')
        return p_d

    def clean_pick_up_time(self):
        p_t = self.cleaned_data['pick_up_time']
        print(p_t)
        if not p_t:
            raise ValidationError('Name less then 2')
        return p_t

    def clean_drop_off_location(self):
        d_l = self.cleaned_data['drop_off_location']
        print(d_l)
        if len(d_l) < 2:
            raise ValidationError('Name less then 2')
        return d_l

    def clean_drop_off_date(self):
        d_d = self.cleaned_data['drop_off_date']
        print(d_d)
        if not d_d:
            raise ValidationError('Name less then 2')
        return d_d

    def clean_drop_off_time(self):
        d_t = self.cleaned_data['drop_off_time']
        print(d_t)
        if not d_t:
            raise ValidationError('Name less then 2')
        return d_t

    def clean_expration_date(self):
        e_d = self.cleaned_data['expration_date']
        print(e_d)
        if not e_d:
            raise ValidationError('Name less then 2')
        return e_d

    def clean_card_holder(self):
        c_h = self.cleaned_data['card_holder']
        print(c_h)
        if not c_h:
            raise ValidationError('Name less then 2')
        return c_h

    def clean_confirmation_one(self):
        flag = self.cleaned_data['confirmation_one']
        print(flag)
        if not flag:
            raise ValidationError('Name less then 2')
        return flag

    def clean_confirmation_two(self):
        flag = self.cleaned_data['confirmation_two']
        print(flag)
        if not flag:
            raise ValidationError('Name less then 2')
        return flag


class RegisterUserForm(UserCreationForm):
    """User registration form"""
    username = forms.CharField(label='Логин', widget=forms.TextInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your login'}))
    email = forms.EmailField(label='Email', widget=forms.EmailInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your email'}))
    password1 = forms.CharField(label='Пароль', widget=forms.PasswordInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your password'}))
    password2 = forms.CharField(label='Повтор пароля', widget=forms.PasswordInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Confirm your password'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class LoginUserForm(AuthenticationForm):
    """User login form"""
    username = forms.CharField(label='Логин', widget=forms.TextInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your login'}))
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your password'}))


class ChangeUserDataForm(forms.ModelForm):
    """Change user data form"""
    username = forms.CharField(label='Логин', widget=forms.TextInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your login'}))
    email = forms.EmailField(label='Email', widget=forms.EmailInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your email'}))
    first_name = forms.CharField(label='First Name', widget=forms.TextInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your first name'}))
    last_name = forms.CharField(label='Last Name', widget=forms.TextInput(
        attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
               'placeholder': 'Your last name'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

