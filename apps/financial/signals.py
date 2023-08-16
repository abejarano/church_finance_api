from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from apps.financial.DTO.movement_bank_dto import MovementBankDTO
from apps.financial.models import Income, MovementBank, BANK
from apps.financial.tasks import create_bank_movement


@receiver(post_save, sender=Income)
def register_income_into_bank(sender, instance: Income, **kwargs):
    if kwargs.get('created'):
        bank = None
        if instance.destination_movement == BANK:
            bank = instance.cost_center.bank

        create_bank_movement(MovementBankDTO(
            bank=bank,
            amount=instance.amount,
            movement_type=MovementBank.CREDIT,
            description=_('Ingreso por:') + ' ' + instance.concept.description
        ))
