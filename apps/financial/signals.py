from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from apps.financial.DTO.diary_book_record_dto import DiayBookRecordDTO
from apps.financial.DTO.movement_bank_dto import MovementBankDTO
from apps.financial.models import Income, MovementBank, BANK
from apps.financial.tasks import create_bank_movement, create_movement_diary_book


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
                description=_('Ingreso por:') + ' ' + instance.concept.description,
                church=instance.church
            ))

        create_movement_diary_book(DiayBookRecordDTO(
            is_credit=True,
            amount=instance.amount,
            destination_movement=instance.destination_movement,
            cost_center=instance.cost_center,
            church=instance.church,
            bank=bank,
            concept=instance.concept,
        ))
