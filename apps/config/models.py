from django.contrib.auth.models import User
from django.db import models
import binascii
import os

from django_softdelete.models import SoftDeleteModel


# Create your models here.

class Country(SoftDeleteModel):
    country_code = models.CharField(max_length=4, primary_key=True)
    name = models.TextField(max_length=80)


class State(SoftDeleteModel):
    country = models.ForeignKey(Country, related_name='state_country', on_delete=models.CASCADE)
    name = models.TextField(max_length=80)


class Token(models.Model):
    key = models.CharField(verbose_name='Key', max_length=40, primary_key=True)
    user = models.OneToOneField(
        User, related_name='token_user',
        on_delete=models.CASCADE
    )

    class Meta:
        db_table = 'config_token'
        verbose_name = 'Token'
        verbose_name_plural = 'Tokens'

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super().save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key
