import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import compression from 'compression';

// Helpers y middlewares
import { CustomLogger } from './helpers/console.mjs';
import { corsMiddleware } from './middleware/cors.mjs';
import { validateToken } from './middleware/jwt.mjs';
import { RateLimit } from './middleware/rateLimit.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';
// config files
import { swaggerConfig } from './config/swagger.mjs';
import { dbConfig } from './config/database.mjs';
import { configHelmet } from './config/helmet.mjs';
//routes system
import routesCategory from './routes/category.mjs';
import routesUser from './routes/user.mjs';
import routesFinancialInformation from './routes/financialInformation.mjs';
import routesFinancialObjective from './routes/financialObjective.mjs';
import routesSubCategory from './routes/subCategory.mjs';
import routesTransaction from './routes/transaction.mjs';

class App {
    constructor() {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 3000;
        this.baseUrl = `/api/v${process.env.VERSION || '1'}`;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.configureMorganLogger();
    }

    /**
     * Inicializa los middlewares principales
     */
    initializeMiddlewares() {
        // Seguridad
        this.app.use(helmet(configHelmet));
        this.app.use(corsMiddleware());

        // Parsers y compresión
        this.app.use(express.json({ limit: '10kb' }));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(morgan('dev'));

        // Rate limiting
        this.app.use(`${this.baseUrl}/*`, RateLimit);
    }

    /**
     * Configura las rutas protegidas y públicas
     */
    initializeRoutes() {
        // Documentación Swagger
        const swaggerSpec = swaggerJsdoc(swaggerConfig);
        this.app.use(
            `${this.baseUrl}/docs`,
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec)
        );

        // Rutas protegidas
        const protectedPaths = [
            'category',
            'financialInformation',
            'financialObjective',
            'subCategory',
            'transaction'
        ];

        protectedPaths.forEach(path => {
            this.app.use(`${this.baseUrl}/${path}/*`, validateToken);
        });
        const configureRoutes = (app, baseUrl) => {
            app.use(baseUrl, [
                routesUser,
                routesCategory,
                routesFinancialObjective,
                routesFinancialInformation,
                routesSubCategory,
                routesTransaction
            ]);
        };
        // Configurar todas las rutas
        configureRoutes(this.app, this.baseUrl);
    }
    /**
     * Configura el manejador de errores global
     */
    initializeErrorHandling() {
        this.app.use(errorHandler);
    }

    /**
     * Conecta a MongoDB y inicia el servidor
     */
    async connectToDatabase() {
        try {
            await mongoose.connect(dbConfig.url, dbConfig.options);
            CustomLogger.log(`MongoDB connected successfully ${dbConfig.options.dbName}`);

            return this.listen();
        } catch (error) {
            CustomLogger.error('MongoDB connection error:', error);
            process.exit(1);
        }
    }
    configureMorganLogger() {
        // Configurar Morgan para todos los entornos
        this.app.use(morgan('dev'));

        // Log de errores
        this.app.use(morgan('dev', {
            skip: (req, res) => res.statusCode < 400,
            stream: {
                write: (message) => CustomLogger.error(message.trim())
            }
        }));
    }
    /**
     * Inicia el servidor
     */
    listen() {
        return this.app.listen(this.port, () => {
            CustomLogger.log(
                `\nServer running in ${this.env} http://localhost:${this.port}${this.baseUrl}/ \n`
            );
            CustomLogger.log(
                `API Documentation available at http://localhost:${this.port}${this.baseUrl}/docs`
            );
        });
    }
}

// Configuración de Mongoose
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

// Crear y exportar la instancia de la aplicación
const server = new App();
export default server;