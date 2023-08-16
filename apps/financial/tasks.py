from background_task import background

from apps.financial.DTO.movement_bank_dto import MovementBankDTO


@background(schedule=3)
def create_bank_movement(movementBankDTO: MovementBankDTO):
    from .models import MovementBank

    movement = MovementBank.objects.create(
        amount=movementBankDTO.amount,
        description=movementBankDTO.description,
        bank=movementBankDTO.bank,
        movement_type=movementBankDTO.movement_type
    )
    print(f"Nuevo movimiento bancario creado: {movement}")
