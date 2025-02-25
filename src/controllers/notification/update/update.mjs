import { CustomLogger } from '../../../helpers/console.mjs';
import { QueryErrors, ValidationError, ServerError } from '../../../helpers/errors.mjs';
import { ModelNotification } from '../../../db/models/notification.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'notification';
import { validatePartialSchemaNotification } from '../../../dataValidations/schema/notification.mjs';
/**
 * Actualizar la categoria
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la respuesta de la actualizacion.
 * 
 * @throws {ValidationError, QueryErrors, ServerError} Error al actualizar la categoria.
 */
export const updateNotification = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    let { notification } = body;
    delete body.notification;
    let validateDataNotification;
    try {
        validateDataNotification = validatePartialSchemaNotification(body);
    } catch (error) {
        const err = new ServerError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataNotification.success) {
        const err = new ValidationError(validateDataNotification.error);
        RecordLog(err, module);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let { data } = validateDataNotification;
    body.update_at = today;
    try {
        await ModelNotification.updateNotification(notification, data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({ notification: data, token }, 'update notification success'));
};