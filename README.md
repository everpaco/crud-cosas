# crud-cosas

CRUD API

Instrucciones rápidas para levantar el proyecto y probar los endpoints.

1) Variables de entorno

Define `DATABASE_URL` o copia el ejemplo y edita:

```
copy .env.example .env
```

Ejemplo de `DATABASE_URL`:

```
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/mi_base_de_datos_dev
PORT=3000
JWT_SECRET=tu_secreto_aqui
```

2) Instalar dependencias

```
npm install
```

3) Crear base de datos y ejecutar migraciones

```
npm run db:create
npm run db:migrate
```

4) Cargar seeder de admin (opcional)

```
npx sequelize-cli db:seed:all
```

5) Levantar servidor

```
npm run dev
```

6) Endpoints de ejemplo (curl)

- Registrar usuario:

```
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"nombre":"Juan","email":"juan@example.com","password":"123456"}'
```

- Login (recibir token):

```
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"juan@example.com","password":"123456"}'
```

- Crear categoría (usa token):

```
curl -X POST http://localhost:3000/categorias -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"nombre":"Salas","descripcion":"Muebles para sala"}'
```

- Crear mueble (usa token):

```
curl -X POST http://localhost:3000/muebles -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"nombre":"Sofa","tipo":"3 plazas","costo":"500","categoriaId":1}'
```

Si quieres, genero también una colección Postman JSON importable.

Despliegue a Render
-------------------

1. Sube tu código a un repositorio en GitHub (o GitLab).
2. En Render (https://render.com) crea un nuevo **Web Service** y conecta tu repo.
	- **Build Command**: `npm install`
	- **Start Command**: `npx sequelize-cli db:migrate && npm start`
3. Crea una base de datos PostgreSQL en Render (Managed Database) o usa una externa.
	- Copia la `DATABASE_URL` que Render te provea.
4. En la sección **Environment** del servicio en Render añade las variables:
	- `DATABASE_URL` = la URL de tu BD (p.ej. `postgres://user:pass@host:5432/dbname`)
	- `JWT_SECRET` = cadena secreta para JWT
	- `PORT` = `3000` (opcional)
5. Si no usas el `startCommand` que ejecuta migraciones, ejecuta las migraciones manualmente
	desde la consola de Render o añade un `Post-Deploy` script: `npx sequelize-cli db:migrate`.

Notas de seguridad:
- No subas `.env` con secretos al repositorio. Usa las Environment Variables del proveedor.
- Para producción, elige un plan de base de datos apropiado y un `JWT_SECRET` fuerte.

Archivo útil: `DEPLOY.md` incluye pasos detallados para Render + Netlify.
