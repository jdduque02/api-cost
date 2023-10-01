import express, { response } from 'express';
import * as dateFns from 'date-fns';
import dotenv from 'dotenv';

import * as validateData from '../../dataValidations/controllers.mjs';
const { validateSchemaUser, validatePartialSchemaUser } = validateData;
import { CustomLogger } from '../../helpers/console.mjs';
import { ValidationError, ServerError, RequestFormatErrors, ResourceNotFoundError, AuthenticationError, AuthorizationError } from '../../helpers/errors.mjs';
import { Responses } from '../../helpers/response.mjs';
import { pathEnv } from '../../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;

const { TIMEZONE, HASH_KEY_USER, HASH_KEY_JWT } = env;

export default {
    validateSchemaUser,
    env,
    express,
    validatePartialSchemaUser,
    CustomLogger,
    ValidationError,
    ServerError,
    RequestFormatErrors,
    ResourceNotFoundError,
    AuthenticationError,
    AuthorizationError,
    response,
    dateFns,
    Responses,
    TIMEZONE,
    HASH_KEY_USER,
    HASH_KEY_JWT
}