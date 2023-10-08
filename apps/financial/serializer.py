from rest_framework import serializers

from apps.financial.models import Concept, Income, CostCenter


class ConceptsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concept
        fields = ['id', 'name', 'description', 'type', 'activated', 'created_at']


class CostCentralSerializer(serializers.ModelSerializer):
    bank_name = serializers.CharField(source='bank.name', read_only=True)

    class Meta:
        model = CostCenter
        fields = [
            'id', 'name', 'bank_name', 'created_at'
        ]


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = [
            'id',
            'amount',
            'church',
            'destination_movement',
            'observation',
            'cost_center',
            'income_data',
        ]
