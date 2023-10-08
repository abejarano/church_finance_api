import secrets

from datetime import date
from django.contrib.auth.models import User
from django.db import models
from django.db.models import ForeignKey
from django_softdelete.models import SoftDeleteModel
from django.utils.translation import gettext_lazy as _
from apps.config.models import Country, State


# Create your models here.
class OrganizationalStructure:
    PRESIDENT = 'PRESIDENT'
    SECRETARY = 'SECRETARY'
    TREASURER = 'TREASURER'


class District(SoftDeleteModel):
    name = models.CharField(max_length=200, null=False, blank=False, verbose_name=_('Nome'))
    registry_number = models.TextField(max_length=80, null=False, blank=False, verbose_name=_('CNPJ'))
    country = models.ForeignKey(Country, related_name='district_country', on_delete=models.PROTECT)
    state = models.ForeignKey(State, related_name='district_state', on_delete=models.PROTECT)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Distritos')
        verbose_name = _('Distrito')


class Region(SoftDeleteModel):
    name = models.CharField(max_length=200, null=False, blank=False, verbose_name=_('Nome'))
    district = models.ForeignKey(District, related_name='region_district', on_delete=models.RESTRICT,
                                 verbose_name=_('Distrito'))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Regiões')
        verbose_name = _('Região')


class DistrictLeadership(SoftDeleteModel):
    LEADERSHIP = (
        (OrganizationalStructure.PRESIDENT, _('Presidente')),
        (OrganizationalStructure.SECRETARY, _('Secretario')),
        (OrganizationalStructure.TREASURER, _('Tesoureiro')),
    )
    district = models.ForeignKey(District, related_name='district_districtLeadership', on_delete=models.CASCADE)
    dni = models.CharField(max_length=30, primary_key=True)
    name = models.TextField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Lideres de distritos')
        verbose_name = _('Lider del distrito')


class Minister(SoftDeleteModel):
    REVERED = 'REVERED'
    DEACONS = 'DEACONS'
    WORKERS = 'WORKERS'

    MINISTER_TYPE = (
        (REVERED, _('Reverendo')),
        (DEACONS, _('Diacono')),
        (WORKERS, _('Obrero')),
    )

    dni = models.CharField(max_length=30, primary_key=True)
    name = models.TextField(max_length=100, null=False, blank=False)
    minister_type = models.CharField(max_length=10, choices=MINISTER_TYPE, db_index=True)
    district = models.ForeignKey(District, related_name='minister_district', on_delete=models.RESTRICT)
    region = models.ForeignKey(Region, related_name='minister_region', on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Ministros')
        verbose_name = _('Ministro')


class Church(SoftDeleteModel):
    name = models.CharField(max_length=200, null=False, blank=False, verbose_name=_('Nome'))
    registry_number = models.TextField(max_length=80, null=True, blank=True, verbose_name=_('CNPJ'))
    email = models.EmailField(max_length=100, unique=True, verbose_name=_('E-mail'))
    address = models.TextField(null=False, blank=False, verbose_name=_('Complemento'))
    street = models.TextField(max_length=60, null=False, blank=False, verbose_name=_('Rua'))
    postal_code = models.CharField(max_length=20, null=False, blank=False, verbose_name=_('CEP'))
    opening_date = models.DateField(verbose_name=_('Data de abertura'))
    city = models.CharField(max_length=40, null=False, blank=False, verbose_name=_('Cidade'))
    country = models.ForeignKey(Country, related_name='church_country', on_delete=models.PROTECT,
                                verbose_name=_('Pais'))
    state = models.ForeignKey(State, related_name='church_state', on_delete=models.PROTECT, verbose_name=_('Estado'))
    minister = models.ForeignKey(Minister, related_name='church_minister', on_delete=models.PROTECT,
                                 verbose_name=_('Ministro'))
    district = models.ForeignKey(District, related_name='church_district', on_delete=models.RESTRICT,
                                 verbose_name=_('Regiāo'))
    region = models.ForeignKey(Region, related_name='church_region', on_delete=models.RESTRICT,
                               verbose_name=_('Regiāo'))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.email = self.email.lower()

        return super(Church, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = _('Igrejas')
        verbose_name = _('Igreja')


class Member(SoftDeleteModel):
    dni = models.CharField(max_length=30, primary_key=True)
    name = models.TextField(max_length=100, null=False, blank=False)
    birthdate = models.DateField(null=False, blank=False, db_index=True)
    phone = models.CharField(max_length=20, null=False, blank=False)
    email = models.CharField(max_length=150, null=True, blank=True)
    conversion_date = models.DateField(null=False, blank=False)
    baptism_date = models.DateField(null=True, blank=True)
    church = models.ForeignKey(Church, related_name='member_church', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def age(self) -> int:
        today = date.today()
        age = today.year - self.birthdate.year - ((today.month, today.day) < (self.birthdate.month, self.birthdate.day))
        return age

    class Meta:
        verbose_name_plural = _('Membros')
        verbose_name = _('Membro')


class Treasurer(SoftDeleteModel):
    church = models.ForeignKey(Church, related_name='treasurer_church', on_delete=models.CASCADE)
    member = models.ForeignKey(Member, related_name='treasurer_member', on_delete=models.RESTRICT)

    def __str__(self):
        return self.member.name

    def data(self) -> ForeignKey:
        return self.member


class UserChurch(models.Model):
    church = models.ForeignKey(Church, null=True, blank=True, related_name='user_church', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='user_userchurch', on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Usuário app')
        verbose_name_plural = _('Usuários app')


class Token(models.Model):
    key = models.CharField(verbose_name='Key', max_length=100, primary_key=True)
    user = models.OneToOneField(
        UserChurch, related_name='token_user',
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
        return secrets.token_hex(32)

    def __str__(self):
        return self.key
