from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.financial.forms import IncomeForm
from apps.financial.models import Concept, Income
from church_financial_api.contrib.soft_delete.exclude_data_soft_delete import ExcludeDataSoftDelete
from admin_auto_filters.filters import AutocompleteFilter


# Register your models here.


class ConceptFilter(AutocompleteFilter):
    title = 'Concept'  # display title
    field_name = 'concept'  # name of the foreign key field


@admin.register(Concept)
class AdminFinancialConcepts(ExcludeDataSoftDelete):
    search_fields = ['name']
    list_display = ['name', 'description', 'type', 'activated']
    list_filter = ['type']


@admin.register(Income)
class AdminIncome(ExcludeDataSoftDelete):
    form = IncomeForm
    list_display = ['amount', 'destination_movement', 'concept', 'income_data']
    list_filter = ['church', ConceptFilter, 'destination_movement']
