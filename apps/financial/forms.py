from django import forms
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.financial.models import Income, Concept


class IncomeForm(forms.ModelForm):
    concept = forms.ModelChoiceField(
        queryset=Concept.objects.filter(type=Concept.INCOME),
        label=_('Conceito')
    )

    class Meta:
        model = Income
        fields = '__all__'
