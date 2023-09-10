
import express, { json } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { corsMiddleware } from './middleware/cors.mjs';
import { pathEnv } from './middleware/dontenv.mjs';
import { customLogger } from './helpers/console.mjs';

const app = express();
//El fragmento de código configura y configura varios middleware para la aplicación Express.
app.disable('x-powered-by'); // Disable x-powered-by express
app.use(json());
app.use(corsMiddleware()); //está configurando el middleware CORS para solucion del conflicto de los cors.
app.use(morgan('dev')); //está configurando el middleware Morgan para registrar solicitudes HTTP.
app.use(bodyParser.urlencoded({ extended: false })); // La línea está configurando el middleware del analizador corporal para analizar datos codificados en URL.
app.use(bodyParser.json());

let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { NAMEDB, USERDB, PASSDB, NAMECLUSTER, VERSION, PORT } = env;
const BASEURL = `/api/v${VERSION}`;

mongoose.Promise = global.Promise;
const URLDB = `mongodb+srv://${USERDB}:${PASSDB}${NAMECLUSTER}/?retryWrites=true&w=majority`;
mongoose.connect(URLDB, {
    dbName: NAMEDB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('strictQuery', false);
// uso de la BD
const db = mongoose.connection;
// BD error de conexion
db.on('error', (err) => customLogger(err));
// BD conectado, retornando mensaje por consola
db.on('connected', () => {

    // asignando el puesto de escucha de la API
    app.listen(PORT, () => {
        customLogger(`Server listening in port ${PORT} and version is v${VERSION}:  [http://localhost:${PORT}${BASEURL}]`);
    });
});
