from django.apps import AppConfig
from django.core.signals import request_finished
from django.utils.translation import gettext_lazy as _


class FinancialConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.financial'
    verbose_name = _('Finanzas')

    def ready(self):
        from . import signals
