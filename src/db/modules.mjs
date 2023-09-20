import * as dateFns from 'date-fns';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const df = dateFns;
import { pathEnv } from '../middleware/dontenv.mjs';
import { QueryErrors, ValidationError } from '../helpers/errors.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
export const { HASH_KEY_USER } = env;

export default {
    HASH_KEY_USER,
    bcrypt,
    df,
    QueryErrors,
    ValidationError,
    jwt,
};
