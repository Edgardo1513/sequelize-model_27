import express from "express";
import db from './utils/database.js';

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