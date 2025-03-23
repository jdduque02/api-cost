import server from './app.mjs';
import { CustomLogger } from './helpers/console.mjs';
process.on('uncaughtException', (err) => {
    CustomLogger.error('UNCAUGHT EXCEPTION! Shutting down...');
    CustomLogger.error(err.name, err.message);
    process.exit(1);
});

server.connectToDatabase().catch((err) => {
    CustomLogger.error('Error starting server:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    CustomLogger.error('UNHANDLED REJECTION! Shutting down...');
    CustomLogger.error(err.name, err.message, err);
    server.close(() => {
        process.exit(1);
    });
});