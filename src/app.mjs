
import express, { json } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//import {swaggerUiMiddleware} from 'swagger-ui-express';
import { corsMiddleware } from './middleware/cors.mjs';
import { pathEnv } from './middleware/dontenv.mjs';
import { CustomLogger } from './helpers/console.mjs';
import { ConnectionError } from './helpers/errors.mjs';
//import swagger from './swagger/swagger.mjs';
import validateToken from './middleware/jwt.mjs';
const app = express();
//El fragmento de código configura y configura varios middleware para la aplicación Express.
app.disable('x-powered-by'); // Disable x-powered-by express
app.use(json());
app.use(corsMiddleware()); //está configurando el middleware CORS para solucion del conflicto de los cors.
app.use(morgan('dev')); //está configurando el middleware Morgan para registrar solicitudes HTTP.
app.use(bodyParser.urlencoded({ extended: false })); // La línea está configurando el middleware del analizador corporal para analizar datos codificados en URL.
app.use(bodyParser.json());
// Define una variable SwaggerUiMiddleware y asigna la función swaggerUiMiddleware a la variable
//const SwaggerUiMiddleware = swaggerUiMiddleware(swagger);

// Agrega el middleware de Swagger
//app.use(SwaggerUiMiddleware);
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { NAMEDB, USERDB, PASSDB, NAMECLUSTER, VERSION, PORT, TIMEZONE } = env;
const BASEURL = `/api/v${VERSION}`;
import routesCategory from './routes/category.mjs';
import routesUser from './routes/user.mjs';
import routesFinancialInformation from './routes/financialInformation.mjs';
import routesFinancialObjective from './routes/financialObjective.mjs';
import routesSubCategory from './routes/subCategory.mjs';
import routesTransaction from './routes/transaction.mjs';
app.use(`${BASEURL}/category/*`, validateToken);
app.use(`${BASEURL}/financialInformation/*`, validateToken);
app.use(`${BASEURL}/financialObjective/*`, validateToken);
app.use(`${BASEURL}/subCategory/*`, validateToken);
app.use(`${BASEURL}/transaction/*`, validateToken);
app.use(BASEURL, routesUser, routesCategory, routesFinancialObjective, routesFinancialInformation, routesSubCategory, routesTransaction);

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
