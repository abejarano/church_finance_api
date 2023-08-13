from django.contrib import admin

from apps.config.models import Country, State
from church_financial_api.contrib.soft_delete.exclude_data_soft_delete import ExcludeDataSoftDelete


# Register your models here.

@admin.register(Country)
class AdminCountry(ExcludeDataSoftDelete):
    list_per_page = 20


@admin.register(State)
class AdminState(ExcludeDataSoftDelete):
    list_per_page = 20
    list_filter = ['country']
