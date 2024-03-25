import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { response } from 'express';
import { CustomLogger } from '../../../helpers/console.mjs';
import { pathEnv } from '../../../middleware/dontenv.mjs';
import { ValidationError, ServerError, ResourceNotFoundError, AuthenticationError, AuthorizationError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelUser } from '../../../db/models/user.mjs';
import { Responses } from '../../../helpers/response.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { HASH_KEY_JWT } = env;
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'user';
import { validateSchemaPartialUser } from '../../../dataValidations/schema/user.mjs';
/**
 * Iniciar sesion del usuario
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con el token del usuario.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthenticationError, AuthorizationError, QueryErrors} Error al iniciar sesion.
 */
export const loginUser = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body } = req;
    //La declaración `if` verifica si el objeto `body` está vacío. Si está vacío, significa que el cuerpo de la solicitud no contiene ningún dato. En este caso, genera un `ResourceNotFoundError` con el mensaje 'cuerpo de petición vacío', registra el error usando `CustomLogger.error` y envía una respuesta con un código de estado de 400 y un mensaje de error usando `Responses.Error`.
    if (Object.keys(body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        RecordLog(err, module);
        CustomLogger.error(`error validate data:\n ${err}`);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si el número de claves en el objeto "cuerpo" es mayor que 1000. Si es así, significa que el cuerpo de la solicitud es demasiado grande. En este caso, devuelve inmediatamente una respuesta con un código de estado de 413 (Entidad de solicitud demasiado grande) y un mensaje de error que indica que el cuerpo de la solicitud es demasiado grande.
    if (Object.keys(body).length > 1000) {
        const err = new AuthorizationError('The body of the request is too large');
        RecordLog(err, module);
        return res.status(413).send(Responses.Error(err.name, err.message));
    }
    //  El bloque de código intenta validar los datos recibidos en el cuerpo de la solicitud utilizando la función `validateSchemaUser`.
    let validateData;
    try {
        validateData = validateSchemaPartialUser(body);
    } catch (error) {
        const err = new ValidationError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateData.success) {
        const err = new ValidationError(validateData.error);
        RecordLog(err, module);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    const { data: { username, password } } = validateData;
    let searchUser;
    try {
        searchUser = await ModelUser.getOneUser({ username });
    } catch (error) {
        let errorSearchUser = new QueryErrors(error);
        RecordLog(errorSearchUser, module);
        CustomLogger.error(`error:\n ${errorSearchUser.stack}`);
        return res.status(400).send(Responses.Error(errorSearchUser.name, errorSearchUser.message));
    }
    let validateLogin;
    try {
        validateLogin = await bcrypt.compare(password, searchUser.password);
    } catch (error) {
        const err = new AuthenticationError(error);
        RecordLog(err, module);
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
        const err = new QueryErrors(error);
        RecordLog(err, module);
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
        RecordLog(err, module);
        CustomLogger.error(`error:\n ${err.stack}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.send(Responses.Successful({token:generateToken}, 'login success'));

}
/**
 * Obtener todos los usuarios
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con todos los usuarios.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthorizationError, QueryErrors} Error al obtener todos los usuarios.
 */
export const getAllUser = async (req, res = response) => {
    let { charge: { data }, token } = req;
    if (data.role !== 1) {
        const validateError = new AuthorizationError('you do not have the permissions to make this request');
        return res.status(401).send(Responses.Error(validateError.name, validateError.message));
    }
    let getAllUser;
    try {
        getAllUser = await ModelUser.getUser({});
    } catch (error) {
        let errorSearchUser = new QueryErrors(error);
        RecordLog(errorSearchUser, module);
        CustomLogger.error(`error:\n ${errorSearchUser.stack}`);
        return res.status(400).send(Responses.Error(errorSearchUser.name, errorSearchUser.message));
    }
    if (getAllUser.length === 0) {
        let errorSearchUser = new ResourceNotFoundError('users not found');
        RecordLog(errorSearchUser, module);
        return res.status(400).send(Responses.Error(errorSearchUser.name, errorSearchUser.message));
    }
    return res.status(200).send(Responses.Successful({users:getAllUser, token}, 'get all user success'));
}
/**
 * Consultar usuarios en base el query
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Object} next - Objeto next HTTP
 * @returns {Object} - Objeto de respuesta HTTP con los usuarios.
 * 
 * @throws { ResourceNotFoundError, AuthorizationError, QueryErrors} Error al consultar los usuarios en la base de datos.
 */
export const validateUser = async (req, res = response, next) => {
    if (!req.params.key || !req.params.value) {
        const err = new ResourceNotFoundError('empty params');
        RecordLog(err, module);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    const { body, params: { key, value } } = req;
    if (Object.keys(body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        RecordLog(err, module);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    if (Object.keys(body).length > 1000) {
        const err = new AuthorizationError('The body of the request is too large');
        RecordLog(err, module);
        return res.status(413).send(Responses.Error(err.name, err.message));
    }
    const searchParams = {};
    searchParams[key] = value;
    let findUser;
    try {
        findUser = await ModelUser.getOneUser(searchParams);
    } catch (error) {
        let errorSearchUser = new QueryErrors(error);
        RecordLog(errorSearchUser, module);
        CustomLogger.error(`error:\n ${errorSearchUser.stack}`);
        return res.status(400).send(Responses.Error(errorSearchUser.name, errorSearchUser.message));
    }
    if (findUser.length === 0) {
        let errorSearchUser = new ResourceNotFoundError('users not found');
        return res.status(400).send(Responses.Error(errorSearchUser.name, errorSearchUser.message));
    }
    req.body.user = findUser;
    next();
}