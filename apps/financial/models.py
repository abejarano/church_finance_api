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


class Bank(SoftDeleteModel):
    CHECKING_ACCOUNT = 'CC'
    SAVING_ACCOUNT = 'SC'

    ACCOUNT_TYPE = (
        (CHECKING_ACCOUNT, _('Conta corrente')),
        (SAVING_ACCOUNT, _('Conta poupança')),
    )
    name = models.CharField(max_length=100, null=False, blank=False, verbose_name=_('Nome'))
    address_instant_payments = models.CharField(max_length=100, null=False, blank=False, verbose_name=_('Chave PIX'))
    bank_instructions = models.TextField(null=False, blank=False, verbose_name=_('Instruções para depósitos'))
    account_type = models.CharField(max_length=2, choices=ACCOUNT_TYPE)
    church = models.ForeignKey(Church, related_name='bank_church', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Bancos')
        verbose_name = _('Banco')
        ordering = ['name']


class MovementBank(SoftDeleteModel):
    CREDIT = 'CREDIT'
    DEBIT = 'DEBIT'

    MOVEMENT_TYPE = (
        (CREDIT, _('Crédito')),
        (DEBIT, _('Débito')),
    )

    bank = models.ForeignKey(Bank, related_name='movement_bank_bak', on_delete=models.PROTECT, verbose_name=_('Banco'))
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, verbose_name=_('Quantia'))
    movement_type = models.CharField(max_length=10, choices=MOVEMENT_TYPE, null=False, blank=False,
                                     verbose_name=_('Tipo de movimento'))
    description = models.CharField(max_length=180, null=False, blank=False, verbose_name=_('Descrição'))
    church = models.ForeignKey(Church, related_name='movement_bank_church', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class CostCenter(SoftDeleteModel):
    name = models.CharField(max_length=100, null=False, blank=False, verbose_name=_('Nome'))
    bank = models.ForeignKey(Bank, related_name='cost_center_bank', on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    church = models.ForeignKey(Church, related_name='cost_center_church', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Centro de custos')
        verbose_name = _('Centro de custo')
        ordering = ['name']


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
    cost_center = models.ForeignKey(CostCenter, related_name='income_cost_center', on_delete=models.PROTECT,
                                    verbose_name=_('centro de custo'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Data da entrada'))

    def __str__(self):
        return str(self.amount)

    def save(self, *args, **kwargs):
        if self.destination_movement == BANK:
            pass

        return super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = _('Entradas')
        verbose_name = _('Entrada')


class Expense(SoftDeleteModel):
    concept = models.ForeignKey(Concept, related_name='expense_concept', on_delete=models.PROTECT)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_data = models.DateField(null=False, blank=False, verbose_name=_('Data da saida'))
    church = models.ForeignKey(Church, related_name='expense_church', on_delete=models.CASCADE)
    destination_movement = models.CharField(max_length=1, choices=DESTINATION_MOVEMENT)
    cost_center = models.ForeignKey(CostCenter, related_name='expense_cost_center', on_delete=models.PROTECT,
                                    verbose_name=_('centro de custo'))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description


class DiaryBook(SoftDeleteModel):
    is_credit = models.BooleanField(null=False, blank=False, verbose_name=_('Foi um credito?'))
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    destination_movement = models.CharField(max_length=1, null=False, blank=True, choices=DESTINATION_MOVEMENT)
    cost_center = models.ForeignKey(CostCenter, related_name='diary_book_cost_center', on_delete=models.PROTECT,
                                    verbose_name=_('centro de custo'))
    church = models.ForeignKey(Church, related_name='diary_book_church', on_delete=models.CASCADE)
    bank = models.ForeignKey(Bank, related_name='diary_book_bank', null=True, blank=True, on_delete=models.PROTECT, verbose_name=_('Banco'))
    concept = models.ForeignKey(Concept, related_name='diary_book_concept', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = _('Livro diario')
        verbose_name = _('Livro diario')
        ordering = ['created_at']
