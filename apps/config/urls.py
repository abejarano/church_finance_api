from django.urls import path

from apps.config.views.views_api import AuthApp

urlpatterns = [
    path('auth/', AuthApp.as_view())
]
