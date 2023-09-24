# Associones
## Levantar el proyecto

Iniciar el proyecto con node

```shell
npm init -y
```

Instalar las dependencias del proyecto
```shell
npm i express sequelize pg pg.hstore cors dotenv 
```

Instalar las dependencia de desarrollo
```shell
npm i nodemon -D
```
## Modificar el package.json
1 agregar el soporte para es6 -->
```json
 "type": "module"
```
2.- Agregar los scripts de arranque y desarrollo
```json
"script":{ 
 "start": "node ./src/pp.js",
 "dev": "nodemon ./src/app.js",
 "test": "echo \"Error: no test specified\" && exit 1"
},

Y al final el package.json nos queda asi:
```
```json
{
  "name": "associations",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node ./src/app.js",
    "dev": "nodemon ./src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.33.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```
## Crear nuestras carpetas y archivos
- /
  - /src
   - /models
   - /utils
   - /componets
   - app.js
- .gitignore
- .env

En .gitignore agregamos lo siguiente

```
node_modules
.env
```
## Crear un servidor Básico

Nos dirigimos al achivo app.js

1 importamos express

```js
import express from "express";
```

2.- Crear una instancia de express
```js
import express from "express";
const app = express();
```

3.- Creamos una ruta para healtCheck
```js
import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('ok')
})
```

4.- Creamos una variable para nuestro Puerto
```js
import express from "express";

const PORT = process.env.PORT ?? 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('ok')
});
```
5.- Dejar escuchando al servidor en el puerto
```js
import express from "express";

const PORT = process.env.PORT ?? 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('ok')
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
```

## Conectarnos a la Base de Datos

1.- Crear una base de datos en postgres.(autos_db)

2.- En utils crear un archivo database.js

3.- Importar Sequelize y dotenv

```js
import { sequelize } = from 'sequelize';
import 'dotenv/config';
```

4.- crear una instancia con la información de la conexión

```js
import { Sequelize } from 'sequelize';
import 'dotenv/config';

const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    dialect: 'postgrest',
    ...(process.env.NODE_ENV === 'production'
     ? { dialecOptions: { ssl: { required: true, rejectUnauthorized: false } } } 
     : {}),
});
```
5.- Exportar la configuración de la conexión
```js
import { Sequelize } from 'sequelize';
import 'dotenv/config';

const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    dialect: 'postgrest',
    ...(process.env.NODE_ENV === 'production'
     ? { dialecOptions: { ssl: { required: true, rejectUnauthorized: false } } } 
     : {}),
});

export default db;
```
### Probar la conexión a la base de datos
> No olvides crear las variables de entorno en tu .env

En app.js importamos db para usar el método authenticate

```js
import express from "express";
import db from './utils/database.js'

const PORT = process.env.PORT ?? 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('ok')
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
```
Usamos el método authenticate para probar la conexión

```js
import express from "express";
import db from './utils/database,js';

db.authenticate()
  .then(() => console.error("Base de datos conectada correctamente"))
  .catch((e) => console.log('e'));

const PORT = process.env.PORT ?? 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('ok')
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
```