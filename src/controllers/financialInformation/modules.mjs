import express, { response } from 'express';
import * as dateFns from 'date-fns';
import dotenv from 'dotenv';

import { pathEnv } from '../../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;

const { TIMEZONE } = env;

export default {
    env,
    express,
    response,
    dateFns,
    TIMEZONE
}