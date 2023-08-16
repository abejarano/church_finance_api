import os
import redis

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'church_financial_api.settings')

app = Celery('church_financial_api')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
