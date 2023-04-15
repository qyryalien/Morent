from django.conf import settings
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms
from django.core.exceptions import ValidationError

from core.models import Order


class PaymentForm(forms.ModelForm):
    """Form for Order model"""
    class Meta:
        model = Order
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
            'car': forms.TextInput(
                attrs={'class': 'element-text valign-text-middle plusjakartasans-medium-nepal-15px',
                       'placeholder': 'Your car'}),
        }

    def clean_phone_number(self):
        """A method for checking if the phone_number field is entered correctly"""
        phone_number = self.cleaned_data['phone_number']
        print(phone_number)
        a_string = str(phone_number)
        if len(a_string) != 12:
            raise ValidationError('The length of the phone number must be 12.')
        return phone_number

    def clean_card_number(self):
        """A method for checking if the card_number field is entered correctly"""
        card_number = self.cleaned_data['card_number']
        print(card_number)
        a_string = str(card_number)
        if len(a_string) != 12:
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
