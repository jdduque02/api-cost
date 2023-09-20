
import express, { json } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { corsMiddleware } from './middleware/cors.mjs';
import { pathEnv } from './middleware/dontenv.mjs';
import { CustomLogger } from './helpers/console.mjs';
import { ConnectionError } from './helpers/errors.mjs';
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
const { NAMEDB, USERDB, PASSDB, NAMECLUSTER, VERSION, PORT, TIMEZONE } = env;
const BASEURL = `/api/v${VERSION}`;
//routes Category
import routesCategory from './routes/category.mjs';
app.use(BASEURL, routesCategory);

app.set('timezone', TIMEZONE);
mongoose.Promise = global.Promise;
const URLDB = `mongodb+srv://${USERDB}:${PASSDB}${NAMECLUSTER}/?retryWrites=true&w=majority`;
mongoose.connect(URLDB, {
    dbName: NAMEDB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// uso de la BD
//const db = mongoose.connection;
// BD error de conexion
mongoose.set('strictQuery', false);
// uso de la BD
const db = mongoose.connection;
// BD error de conexion
db.on('error', (err) => CustomLogger.err(err instanceof ConnectionError));
// BD conectado, retornando mensaje por consola
db.on('connected', () => {
    // asignando el puesto de escucha de la API
    app.listen(PORT, () => {
        CustomLogger.log(`Server listening in port ${PORT} and version is v${VERSION}:  [http://localhost:${PORT}${BASEURL}]`);
    });
});
