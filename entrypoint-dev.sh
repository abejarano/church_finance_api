#!/bin/bash

# Esperar a que la base de datos esté disponible
echo "Waiting for postgres..."

until nc -z -v -w30 db 5432; do
  sleep 0.1
done

# Ejecutar las migraciones
python manage.py makemigrations config church financial
python manage.py migrate

if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ] ; then
    python /app/manage.py createsuperuser --no-input
fi
# Ejecutar el comando proporcionado o iniciar el servidor por defecto
exec "$@"
