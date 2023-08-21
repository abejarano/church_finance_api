from django.contrib import admin

from apps.inventory.models import Product
from church_financial_api.contrib.soft_delete.exclude_data_soft_delete import ExcludeDataSoftDelete


# Register your models here.

@admin.register(Product)
class AdminMaterialOrEquipment(ExcludeDataSoftDelete):
    list_display = ['name', 'manage_inventory']
