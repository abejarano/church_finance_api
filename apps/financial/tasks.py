from celery import shared_task

from apps.financial.DTO.diary_book_record_dto import DiayBookRecordDTO
from apps.financial.DTO.movement_bank_dto import MovementBankDTO
from apps.financial.models import DiaryBook


@shared_task
def create_bank_movement(movement: MovementBankDTO):
    from .models import MovementBank

    result = MovementBank.objects.create(
        amount=movement.amount,
        description=movement.description,
        bank=movement.bank,
        movement_type=movement.movement_type,
        church=movement.church_id
    )
    print(f"Nuevo movimiento bancario creado: {result}")


@shared_task
def create_movement_diary_book(movement: DiayBookRecordDTO):
    result = DiaryBook.objects.create(
        is_credit=movement.is_credit,
        amount=movement.amount,
        destination_movement=movement.destination_movement,
        cost_center=movement.cost_center,
        church=movement.church,
        bank=movement.bank,
        concept=movement.concept,
    )
    print(f"Nuevo reigstro en el libro diario: {result}")
