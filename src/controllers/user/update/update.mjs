/* import dotenv from 'dotenv';
import { zonedTimeToUtc } from 'date-fns-tz';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { pathEnv } from '../../../middleware/dontenv.mjs';
import { ValidationError, ServerError, ResourceNotFoundError, AuthenticationError, AuthorizationError } from '../../../helpers/errors.mjs';
import { ModelUser } from '../../../db/models/user.mjs';
import { Responses } from '../../../helpers/response.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE, HASH_KEY_USER } = env;
const { response } = modules;
import { validateSchemaPartialUser } from '../../../dataValidations/schema/user.mjs';
export const updateUser = async (req, res = response) => {
    let today = new Date();
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    const { body } = req;
    let { user } = body;
    delete body.user;
    let validateDataUser;
    for (let index = 0; index < Object.keys(body).length; index++) {
        let name = Object.keys(body)[index];
        if (typeof user[name] !== 'string') {
            const err = new ValidationError('attribute does not exist');
            return res.status(500).send(Responses.Error(err.name, err.message));
        }
    }
    try {
        validateDataUser = validateSchemaPartialUser(body);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataUser.success) {
        const err = new ValidationError(validateDataUser.error);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    body.update_at = today;
    return res.send({ body, user, validateDataUser });
    //changeHistoryUser
    let change = {
        modifiedVariable: 
    };
}; */