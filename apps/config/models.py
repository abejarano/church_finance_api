from django.db import models
from django.utils.translation import gettext_lazy as _
from django_softdelete.models import SoftDeleteModel


# Create your models here.

class Country(SoftDeleteModel):
    country_code = models.CharField(max_length=4, primary_key=True)
    name = models.TextField(max_length=80)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Paises')
        verbose_name = _('Pais')
        ordering = ['name']


class State(SoftDeleteModel):
    country = models.ForeignKey(Country, related_name='state_country', on_delete=models.CASCADE)
    name = models.TextField(max_length=80)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Estados')
        verbose_name = _('Estado')
        ordering = ['name']
