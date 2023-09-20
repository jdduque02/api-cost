import { response } from 'express';
import * as dateFns from 'date-fns';
import dotenv from 'dotenv';
import * as model from '../../db/models.mjs';
const { modelCategory } = model;
import * as validateData from '../../dataValidations/controllers.mjs';
const { validateSchemaCategory, validatePartialSchemaCategory } = validateData;
import { CustomLogger } from '../../helpers/console.mjs';
import { ValidationError, ServerError, ResponseFormatErrors, ResourceNotFoundError, AuthenticationError, AuthorizationError } from '../../helpers/errors.mjs';
import { Responses } from '../../helpers/response.mjs';
import { pathEnv } from '../../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE } = env;


export default {
    Category: modelCategory,
    validatePartialSchemaCategory,
    validateSchemaCategory,
    CustomLogger,
    ValidationError,
    ServerError,
    ResponseFormatErrors,
    ResourceNotFoundError,
    AuthenticationError,
    AuthorizationError,
    response,
    dateFns,
    Responses,
    TIMEZONE,
    Validate: validateSchemaCategory,
}