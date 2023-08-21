from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ChurchConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.church'
    verbose_name = _('Estrutura da igreja')
