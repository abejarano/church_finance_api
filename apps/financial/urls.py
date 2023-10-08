from django.urls import path

from apps.financial.view_api import ConceptsAPI, IncomeAPI, CostCentralAPI

urlpatterns = [
    path('concepts/<typeconcept>', ConceptsAPI.as_view()),
    path('cost-center/<church>', CostCentralAPI.as_view()),
    path('income/', IncomeAPI.as_view()),
]
