import dotenv from 'dotenv';

import { pathEnv } from '../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
export const customLogger = (message) => {
    if (env.APP_ENV === 'DEV') {
        console.log(message);
    }
}