from django.contrib.auth.hashers import check_password
from apps.church.models import UserChurch
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _
from apps.church.models import Token
from apps.config.serializers import AuthAppSerializer
from django.contrib.auth.models import User


class AuthApp(APIView):
    permission_classes = [AllowAny]
    serializers = AuthAppSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.data

            user_instance = self.__validate_user(data)
            user_church = UserChurch.objects.get(user=user_instance)

            token, created = self.__get_token_auth(user_church)

            response = dict(
                super_user=user_instance.is_superuser,
                username=user_instance.username,
                token=token.key,
                church=dict(
                    name=user_church.church.name,
                    id=user_church.church.id
                )
            )

            return Response(response)

        except serializers.ValidationError as e:
            error_response = {
                'errors': e.detail
            }
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

    def __get_token_auth(self, user: UserChurch) -> dict:
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
