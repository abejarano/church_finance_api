from celery import shared_task

from apps.inventory.models import Product, Inventory


@shared_task
def record_inventory_to_product(material: Product, amountpurchased: int):
    inventory = Inventory.objects.get(material_equipment=material)
    inventory.quantity = inventory.quantity + amountpurchased
    inventory.save()
