from django.db import models
from django_softdelete.models import SoftDeleteModel


# Create your models here.

class District(SoftDeleteModel):
    name = models.CharField(max_length=200, null=False, blank=False)
    registry_number = models.TextField(max_length=80, null=False, blank=False)

    def __str__(self):
        return self.name


class Region(SoftDeleteModel):
    name = models.CharField(max_length=200, null=False, blank=False)
    district = models.ForeignKey(District, related_name='region_district', on_delete=models.RESTRICT)

    def __str__(self):
        return self.name


class Minister(SoftDeleteModel):
    name = models.TextField(max_length=100, null=False, blank=False)
    dni = models.CharField(max_length=30, db_index=True)
    district = models.ForeignKey(District, related_name='church_district', on_delete=models.RESTRICT)
    region = models.ForeignKey(Region, related_name='church_region', on_delete=models.RESTRICT)

    def __str__(self):
        return self.name


class Church(SoftDeleteModel):
    name = models.CharField(max_length=200, null=False, blank=False)
    registry_number = models.TextField(max_length=80)
    address = models.TextField(null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, )
    minister = models.ForeignKey(Minister, related_name='church_minister', on_delete=models.PROTECT)
    district = models.ForeignKey(District, related_name='church_district', on_delete=models.RESTRICT)
    region = models.ForeignKey(Region, related_name='church_region', on_delete=models.RESTRICT)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.email = self.email.lower()

        return super(Church, self).save(*args, **kwargs)
