import dotenv from 'dotenv';
import { zonedTimeToUtc } from 'date-fns-tz';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { pathEnv } from '../../../middleware/dontenv.mjs';
import { ValidationError, ServerError, ResourceNotFoundError, AuthenticationError } from '../../../helpers/errors.mjs';
import { ModelUser } from '../../../db/models/user.mjs';
import { Responses } from '../../../helpers/response.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE, HASH_KEY_JWT } = env;
const { response } = modules;
import { validateSchemaPartialUser } from '../../../dataValidations/schema/user.mjs';
//La función `loginUser` es una función asincrónica que maneja la lógica para el inicio de sesión del usuario. Toma dos parámetros, `req` y `res`, que representan los objetos de solicitud y respuesta respectivamente.
export const loginUser = async (req, res = response) => {
    let today = new Date();
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    const { body } = req;
    //La declaración `if` verifica si el objeto `body` está vacío. Si está vacío, significa que el cuerpo de la solicitud no contiene ningún dato. En este caso, genera un `ResourceNotFoundError` con el mensaje 'cuerpo de petición vacío', registra el error usando `CustomLogger.error` y envía una respuesta con un código de estado de 400 y un mensaje de error usando `Responses.Error`.
    if (Object.keys(body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        CustomLogger.error(`error validate data:\n ${err}`);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si el número de claves en el objeto "cuerpo" es mayor que 1000. Si es así, significa que el cuerpo de la solicitud es demasiado grande. En este caso, devuelve inmediatamente una respuesta con un código de estado de 413 (Entidad de solicitud demasiado grande) y un mensaje de error que indica que el cuerpo de la solicitud es demasiado grande.
    if (Object.keys(body).length > 1000) return res.status(413).send(Responses.Error('The body of the request is too large'));
    //  El bloque de código intenta validar los datos recibidos en el cuerpo de la solicitud utilizando la función `validateSchemaUser`.
    let validateData;
    try {
        validateData = validateSchemaPartialUser(body);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateData.success) {
        const err = new ValidationError(validateData.error);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    const { data: { username, password } } = validateData;
    let searchUser;
    try {
        searchUser = await ModelUser.getOneUser({ username });
    } catch (error) {
        CustomLogger.error(`error:\n ${error}`);
        return res.status(400).send(Responses.Error(error.name, error.message));
    }
    let validateLogin;
    try {
        validateLogin = await bcrypt.compare(password, searchUser.password);
    } catch (error) {
        const err = new AuthenticationError(error);
        return res.status(500).send(Responses.Error(err));
    }
    if (!validateLogin) {
        const errLogin = new AuthenticationError('incorrect credentials');
        CustomLogger.log(errLogin);
        return res.status(401).send(Responses.Error(errLogin.name, errLogin.message));
    }
    let updateLastConnetUser;
    try {
        updateLastConnetUser = await ModelUser.updateUser(searchUser, { last_conect: today });
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    let { role, email, numerPhone } = updateLastConnetUser;
    let expiresIn = today.setUTCHours(today.getUTCHours() + 2);
    let charge = {
        data: {
            username,
            role,
            email,
            numerPhone,
        },
        expiresIn,
        iat: today.getTime()
    };
    let generateToken;
    try {
        generateToken = jwt.sign(charge, HASH_KEY_JWT);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.send(Responses.Successful(generateToken, 'sucess'));

}