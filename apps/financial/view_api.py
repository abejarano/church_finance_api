from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.financial.models import Concept, Income, CostCenter
from apps.financial.serializer import ConceptsSerializer, IncomeSerializer, CostCentralSerializer


class ConceptsAPI(APIView):
    def get(self, request, typeconcept):
        data = Concept.objects.filter(activate=True, type=typeconcept)
        serialize = ConceptsSerializer(data, many=True)
        return Response(serialize.data)


class CostCentralAPI(APIView):
    def get(self, request, church):
        data = CostCenter.objects.filter(active=True, church_id=church)
        serialize = CostCentralSerializer(data, many=True)
        return Response(serialize.data)


class IncomeAPI(CreateAPIView):
    serializer_class = IncomeSerializer
    queryset = Income.objects.all()
