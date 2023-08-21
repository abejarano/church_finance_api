from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.inventory.models import PurchaseDetail, Inventory
from apps.inventory.task import record_inventory_to_product


@receiver(post_save, sender=PurchaseDetail)
def register_product_in_inventory(sender, instance: PurchaseDetail, **kwargs):
    if kwargs.get('created'):
        if not instance.material_equipment.manage_inventory:
            return

        record_inventory_to_product(instance.material_equipment, instance.quantity)
