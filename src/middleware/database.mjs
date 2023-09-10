/* eslint-disable no-undef */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { pathEnv } from '../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { NAMEDB, USERDB, PASSDB, NAMECLUSTER } = env;
//mongoose.Promise = global.Promise;
const URLDB = `mongodb+srv://${USERDB} :${PASSDB}${NAMECLUSTER}/?retryWrites=true&w=majority`;
mongoose.connect(URLDB, {
    dbName: NAMEDB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
export const validaConnet = mongoose.connection.isConnected() ? true : false;