export const dbConfig = {
    url: `mongodb+srv://${process.env.USERDB}:${process.env.PASSDB}${process.env.NAMECLUSTER}/?retryWrites=true&w=majority`,
    options: {
        dbName: process.env.NAMEDB,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false, // Para producción
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    }
};