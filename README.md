# Que es Church Finance

Church Finance API es una solución moderna y flexible para la gestión financiera de iglesias. Permite administrar
miembros, donaciones, conceptos financieros y notificaciones de manera eficiente y segura.

¡Optimiza la administración de tu iglesia con tecnología de vanguardia!

# Stack

- [`node v22`](https://nodejs.org/)
- [`express`](https://expressjs.com/)
- [`typescript`](https://www.typescriptlang.org/)
- [`docker`](https://www.docker.com/) [`docker-compose`](https://docs.docker.com/compose/)
- [`redis`](https://redis.io/)
- [`bull`](https://github.com/OptimalBits/bull)

# Ejecutar el proyecto en local

Debe tener instalado docker y nodejs en la version 20

- Crear la red docker-network (sino existe)

```
docker network create church_sion
```

- Crear una instancia de redis en local

```
docker run --name church_finance_redis -d --network=church_sion -p 6379:6379 --restart always redis
```
