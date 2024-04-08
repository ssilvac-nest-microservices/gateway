# Cliente Gateway

## DEV

1. Clonar repositorio
2. instalar dependencias
3. crear archivo `.env` basado en `env.template`
4. levantar servidor nats
```
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```
5. tener levantados los microservicios que se van a consumir
6. levantar proyecto con `pnpm start:dev`
