from rest_framework import serializers
from django.contrib.auth.models import User


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    """
        Serializer for user
    """

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'date_joined')

    def update(self, instance, validated_data):
        for(key, value) in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    model = User

    new_password = serializers.CharField(required=True)
    new_password_confirm = serializers.CharField(required=True)