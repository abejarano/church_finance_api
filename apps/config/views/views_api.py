import json

from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _
from apps.config.models import Token
from apps.config.serializers import AuthAppSerializer


class AuthApp(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            serializer = AuthAppSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.data

            user_instance = self.__validate_user(data)

            token, created = self.__get_token_auth(user_instance)

            response = dict(
                super_user=user_instance.is_superuser,
                username=user_instance.username,
                token=token.key
            )

            return Response(response)

        except serializers.ValidationError as e:
            error_response = {
                'errors': e.detail
            }
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

    def __get_token_auth(self, user: User) -> dict:
        Token.objects.filter(user=user).delete()
        return Token.objects.get_or_create(user=user)

    def __validate_user(self, data: dict) -> User:
        try:
            user = User.objects.get(email=data['email'])
            print(user.username)
        except ObjectDoesNotExist:
            raise ValidationError({'email': _('O E-mail informado não está cadastrado no sistema.')})
        else:
            if not check_password(data['password'], user.password):
                raise ValidationError({'password': _('A senha não está correta.')})
        return user
