from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.financial.DTO.movement_bank_dto import MovementBankDTO
from apps.financial.models import Income
from apps.financial.tasks import create_bank_movement


@receiver(post_save, sender=Income)
def register_income_into_bank(sender, instance: Income, **kwargs):
    if kwargs.get('created'):
        create_bank_movement(schedule=3, movementBankDTO=MovementBankDTO(
            bank=instance.cost_center.bank
        ))
