
import dotenv from 'dotenv';
import app from '../app.mjs';
import { pathEnv } from '../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
export const { VERSION } = env;
export default {
    VERSION,
    app,
}
