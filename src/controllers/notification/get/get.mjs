import { response } from 'express';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors, ValidationError, AuthorizationError } from '../../../helpers/errors.mjs';
import { ModelNotification } from '../../../db/models/notification.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { RecordLog } from '../../../helpers/logs.mjs';

import { validatePartialSchemaNotification } from '../../../dataValidations/schema/notification.mjs';
const module = 'notification';
/**
 * Obtener todas los categorias
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con todos los categorias.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthorizationError, QueryErrors} Error al obtener todos los categorias.
 */
export const getAllNotification = async (req, res = response) => {
    if (req.charge.role !== 1) {
        const AuthorizationNotValide = new AuthorizationError('you do not have permissions');
        RecordLog(AuthorizationNotValide, module);
        return res.status(401).send(Responses.Error(AuthorizationNotValide.name, AuthorizationNotValide.message));
    }
    let getAllNotification;
    try {
        getAllNotification = await ModelNotification.getAllNotification({});
    } catch (error) {
        let errorSearchNotification = new QueryErrors(error);
        RecordLog(errorSearchNotification, module);
        CustomLogger.error(`error:\n ${errorSearchNotification.stack}`);
        return res.status(400).send(Responses.Error(errorSearchNotification.name, errorSearchNotification.message));
    }
    if (getAllNotification.length === 0) {
        let errorSearchNotification = new ResourceNotFoundError('notifications not found');
        RecordLog(errorSearchNotification, module);
        return res.status(400).send(Responses.Error(errorSearchNotification.name, errorSearchNotification.message));
    }
    return res.status(200).send(Responses.Successful(getAllNotification, 'get all notification success'));
}
/**
 * Consultar categorias en base el query
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Object} next - Objeto next HTTP
 * @returns {Object} - Objeto de respuesta HTTP con los categorias.
 * 
 * @throws { ResourceNotFoundError, AuthorizationError, QueryErrors} Error al consultar los categorias en la base de datos.
 */
export const validateNotification = async (req, res = response, next) => {
    if (!req.params.key || !req.params.value) {
        const err = new ResourceNotFoundError('empty params');
        RecordLog(err, module);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    const { body, params: { key, value } } = req;
    const searchParams = {};
    searchParams[key] = value;
    let validateData;
    try {
        validateData = validatePartialSchemaNotification(searchParams);
    } catch (error) {
        const err = new validatePartialSchemaNotification(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        RecordLog(err, module);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateData.success) {
        const err = new ValidationError(validateData.error);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let findNotification;
    try {
        findNotification = await ModelNotification.getAllNotification(searchParams);
    } catch (error) {
        let errorSearchNotification = new QueryErrors(error);
        CustomLogger.error(`error:\n ${errorSearchNotification.stack}`);
        RecordLog(errorSearchNotification, module);
        return res.status(400).send(Responses.Error(errorSearchNotification.name, errorSearchNotification.message));
    }
    if (findNotification.length === 0) {
        let errorSearchNotification = new ResourceNotFoundError('notifications not found');
        RecordLog(errorSearchNotification, module);
        return res.status(400).send(Responses.Error(errorSearchNotification.name, errorSearchNotification.message));
    }
    req.body.notification = findNotification;
    next();
}
/**
 * Mostrar categorias en base el query
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Object} next - Objeto next HTTP
 * @returns {Object} - Objeto de respuesta HTTP con los categorias.
 * 
 * @throws { ResourceNotFoundError, AuthorizationError, QueryErrors} Error al consultar los categorias en la base de datos.
 */
export const showNotification = async (req, res = response) => {
    //notification
    const { body, token } = req;
    const { notification } = body;
    return res.status(200).send(Responses.Successful({ notification, token }, 'show notification´s success'));
}