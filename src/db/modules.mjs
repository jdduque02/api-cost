import { Schema, model } from 'moongose';
import * as dateFns from "date-fns";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { pathEnv } from '../middleware/dontenv.mjs';

let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE, HASH_KEY_USER } = env;

export default {
    Schema,
    HASH_KEY_USER,
    model,
    bcrypt,
    dateFns,
    jwt,
    TIMEZONE
};
