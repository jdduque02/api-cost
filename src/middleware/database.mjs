/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { pathEnv } from '../middleware/dontenv.mjs';

let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { NAMEDB, USERDB, PASSDB, NAMECLUSTER } = process.env;
const URLDB = `mongodb+srv://${USERDB} :${PASSDB}${NAMECLUSTER}/?retryWrites=true&w=majority`;
mongoose.connect(URLDB, {
    dbName: NAMEDB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
export const validaConnet = mongoose.connection.isConnected() ? true : false;