from django.db import models


# Create your models here.

class District(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    registry_number = models.TextField(max_length=80, null=False, blank=False)


class Region(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    district = models.ForeignKey(District, related_name='region_district', on_delete=models.RESTRICT)


class Church(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    registry_number = models.TextField(max_length=80)
    address = models.TextField(null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, )
    district = models.ForeignKey(District, related_name='church_district', on_delete=models.RESTRICT)
    region = models.ForeignKey(Region, related_name='church_region', on_delete=models.RESTRICT)

    def save(self, *args, **kwargs):
        self.email = self.email.lower()

        return super(Church, self).save(*args, **kwargs)
