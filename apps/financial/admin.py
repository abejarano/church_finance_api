from django.contrib import admin

from apps.financial.models import Concept
from church_financial_api.contrib.soft_delete.exclude_data_soft_delete import ExcludeDataSoftDelete


# Register your models here.


@admin.register(Concept)
class AdminFinancialConcepts(ExcludeDataSoftDelete):
    list_display = ['name', 'description', 'type', 'activated']
    list_filter = ['type']
