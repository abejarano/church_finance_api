from django.db import models
from django_softdelete.models import SoftDeleteModel
from django.utils.translation import gettext_lazy as _
from apps.church.models import Church

# Create your models here.

IN_CASH = 'C'
BANK = 'B'
DESTINATION_MOVEMENT = (
    (IN_CASH, _('Em espécie')),
    (BANK, 'Em Banco'),
)


class Concept(SoftDeleteModel):
    INCOME = 'I'
    DISCHARGE = 'E'
    CONCEPTS_TYPES = (
        (INCOME, _('ENTRADA')),
        (DISCHARGE, _('SAIDA')),
    )
    name = models.CharField(max_length=80, verbose_name=_('Nome'))
    description = models.CharField(max_length=200, verbose_name=_('Descriçāo'))
    type = models.CharField(max_length=1, choices=CONCEPTS_TYPES, verbose_name=_('Tipo'))
    activated = models.BooleanField(default=True, verbose_name=_('Ativo?'))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Conceitos')
        verbose_name = _('Conceito')
        ordering = ['name']


class Income(SoftDeleteModel):
    concept = models.ForeignKey(Concept, related_name='income_concept', on_delete=models.PROTECT,
                                verbose_name=_('Conceito'))
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, verbose_name=_('Quantia'))
    church = models.ForeignKey(Church, related_name='income_church', on_delete=models.CASCADE, verbose_name=_('Igreja'))
    destination_movement = models.CharField(max_length=1, choices=DESTINATION_MOVEMENT, null=False, blank=False,
                                            verbose_name=_('Entrada feita em?'))
    observation = models.CharField(max_length=100, null=True, blank=True, verbose_name=_('Observação'))
    income_data = models.DateField(null=False, blank=False, verbose_name=_('Data da entrada'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Data da entrada'))

    def __str__(self):
        return str(self.amount)

    class Meta:
        verbose_name_plural = _('Entradas')
        verbose_name = _('Entrada')


class Expense(models.Model):
    concept = models.ForeignKey(Concept, related_name='expense_concept', on_delete=models.PROTECT)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_data = models.DateField(null=False, blank=False, verbose_name=_('Data da saida'))
    church = models.ForeignKey(Church, related_name='expense_church', on_delete=models.CASCADE)
    destination_movement = models.CharField(max_length=1, choices=DESTINATION_MOVEMENT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description
