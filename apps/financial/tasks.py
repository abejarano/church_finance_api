from celery import shared_task

from apps.financial.DTO.movement_bank_dto import MovementBankDTO


@shared_task
def create_bank_movement(movementbankdto: MovementBankDTO):
    from .models import MovementBank

    movement = MovementBank.objects.create(
        amount=movementbankdto.amount,
        description=movementbankdto.description,
        bank=movementbankdto.bank,
        movement_type=movementbankdto.movement_type
    )
    print(f"Nuevo movimiento bancario creado: {movement}")
