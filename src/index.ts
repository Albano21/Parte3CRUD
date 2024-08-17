import express from 'express';
import path from 'path';
import sincronizar from './db/sync';
import articulosRoute from './routes/articulosRoute'
import autenticionRoute from './routes/autenticacionRoute'
import bodyParser from 'body-parser';
import { auth } from './middlewares/auth';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './swagger';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT;
setupSwagger(app);

sincronizar()

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/autenticacion', autenticionRoute)
app.use('/articulos', auth, articulosRoute)

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});