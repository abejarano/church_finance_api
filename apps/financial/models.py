from django.db import models


# Create your models here.

class FinancialConcepts(models.Model):
    CONCEPTS_TYPES = (
        ('I', 'Ingreso'),
        ('E', 'Egreso'),
    )
    description = models.CharField(max_length=100)
    type = models.CharField(max_length=1, choices=CONCEPTS_TYPES)
    activated = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description

    class Meta:
        db_table = 'adm_concepts'
        verbose_name_plural = 'Concepts'
        verbose_name = 'Concept'


class Income(models.Model):
    INCOME_TYPES = (
        ('offering', 'Worship Offering'),
        ('tithe', 'Tithe'),
        ('donation', 'Financial Donation'),
    )

    type = models.CharField(max_length=20, choices=INCOME_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20)  # 'cash' or 'bank'

    def __str__(self):
        return f"{self.get_type_display()} - {self.amount}"