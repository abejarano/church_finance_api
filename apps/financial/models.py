from django.db import models
from django_softdelete.models import SoftDeleteModel

from apps.church.models import Church

# Create your models here.

DESTINATION_MOVEMENT = (
    ('C', 'PETTY_CASH'),
    ('E', 'BANK'),
)


class FinancialConcepts(SoftDeleteModel):
    CONCEPTS_TYPES = (
        ('I', 'INCOME'),
        ('E', 'DISCHARGE'),
    )
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=200)
    type = models.CharField(max_length=1, choices=CONCEPTS_TYPES)
    activated = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description


class Income(SoftDeleteModel):
    concept = models.ForeignKey(FinancialConcepts, related_name='income_concept', on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    church = models.ForeignKey(Church, related_name='income_church', on_delete=models.CASCADE)
    destination_movement = models.CharField(max_length=1, choices=DESTINATION_MOVEMENT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_type_display()} - {self.amount}"


class Expense(models.Model):
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    church = models.ForeignKey(Church, related_name='expense_church', on_delete=models.CASCADE)
    destination_movement = models.CharField(max_length=1, choices=DESTINATION_MOVEMENT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description
