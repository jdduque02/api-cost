import { Schema, model } from 'moongose';
import * as dateFns from "date-fns";
import dotenv from 'dotenv';
import { pathEnv } from '../middleware/dontenv.mjs';
import bcrypt from 'bcrypt';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE, HASH_KEY_USER } = env;

export default {
    Schema,
    HASH_KEY_USER,
    model,
    bcrypt,
    dateFns,
    TIMEZONE
};
