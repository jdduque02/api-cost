import dotenv from 'dotenv';
import { zonedTimeToUtc } from 'date-fns-tz';
import { randomUUID } from 'node:crypto'
/* import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; */

import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { pathEnv } from '../../../middleware/dontenv.mjs';
import { ValidationError, ServerError, /* ResourceNotFoundError, AuthenticationError, AuthorizationError */ } from '../../../helpers/errors.mjs';
import { ModelUser } from '../../../db/models/user.mjs';
import { Responses } from '../../../helpers/response.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE } = env;
const { response } = modules;
import { validateSchemaPartialUser } from '../../../dataValidations/schema/user.mjs';

//El código define una función asincrónica llamada `updateUser` que toma dos parámetros: `req` y `res`.
export const updateUser = async (req, res = response) => {
    let today = new Date();
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    today.setUTCHours(today.getUTCHours() - 5);
    const { body } = req;
    let { user } = body;
    delete body.user;
    let validateDataUser;
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
    let { data } = validateDataUser;
    body.update_at = today;
    let change = [];
    Object.entries(data).forEach(([key, value]) => {
        change.push({ _id: randomUUID(), modifiedVariable: key, dateModification: today, valuePrevious: user[key], valueNew: value });
    });
    data.changeData = change;
    try {
        await ModelUser.updateUser(user, data);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful(data, 'update user success'));
};