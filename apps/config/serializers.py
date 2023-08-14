from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework import serializers
from rest_framework.fields import EmailField, CharField
from django.utils.translation import gettext_lazy as _


class AuthAppSerializer(serializers.Serializer):
    email = EmailField(required=True, max_length=60)
    password = CharField(required=True, max_length=100)

