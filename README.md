## ¿Cómo crear el ambiente de desarrollo?

1. Debe tener instalado Docker y Docker compose
2. Clonar el repositorio.
3. Ejecutar el comando:
```
$: docker compose up
```

El sistema ejecutara las migraciones y creara el usuarios
```
user: admin
password: 12345678
```

## Ejecutar migraciones manualmente
1. Crear las migraciones
```
docker exec -it church_financial_api python manage.py makemigrations config church financial
```
2. Ejecutar las migraciones

```
docker exec -it church_financial_api python manage.py migrate
```

3. Carga de datos basicos

```
docker exec -it church_financial_api python manage.py loaddata fixtures/config.json
docker exec -it church_financial_api python manage.py loaddata fixtures/church.json
docker exec -it church_financial_api python manage.py loaddata fixtures/financial_config.json
```