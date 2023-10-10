import { response } from 'express';
import * as dateFns from 'date-fns';
import dotenv from 'dotenv';
import { Responses } from '../../helpers/response.mjs';
import { pathEnv } from '../../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE } = env;

export default {
    response,
    dateFns,
    Responses,
    TIMEZONE,
}