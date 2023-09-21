
import dotenv from 'dotenv';
import app from '../app.mjs';
import { pathEnv } from '../middleware/dontenv.mjs';
import request from 'supertest';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
export const { VERSION } = env;
export default {
    VERSION,
    app,
    request
}
