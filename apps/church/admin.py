from django.contrib import admin

from apps.church.models import District, Region, Minister
from church_financial_api.contrib.soft_delete.exclude_data_soft_delete import ExcludeDataSoftDelete


# Register your models here.


@admin.register(District)
class AdminDistrict(ExcludeDataSoftDelete):
    list_display = ['name', 'country', 'state']


@admin.register(Region)
class AdminRegion(ExcludeDataSoftDelete):
    list_display = ['name', 'district']


@admin.register(Minister)
class AdminMinister(ExcludeDataSoftDelete):
    list_display = ['dni', 'name', 'minister_type', 'district', 'region']
    list_filter = ['minister_type', 'district', 'region']
