import express, { response } from 'express';
import * as dateFns from 'date-fns';
import dotenv from 'dotenv';
import { pathEnv } from '../../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;

const { TIMEZONE, HASH_KEY_USER, HASH_KEY_JWT } = env;
export default {
    env,
    express,
    response,
    dateFns,
    TIMEZONE,
    HASH_KEY_USER,
    HASH_KEY_JWT
}