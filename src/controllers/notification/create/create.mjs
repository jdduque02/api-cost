import { response } from 'express';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelNotification } from '../../../db/models/notification.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { RecordLog } from '../../../helpers/logs.mjs';
import { validateSchemaNotification } from '../../../dataValidations/schema/notification.mjs';
const module = 'notification';
/**
 * Crea una nueva categoria en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la categoria creada.
 * 
 * @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al crear la categoria.
 */
export const createNotification = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    body.created_at = today;
    body.update_at = today;
    let validateData;
    try {
        validateData = validateSchemaNotification(body);
    } catch (error) {
        const err = new ValidationError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        RecordLog(err, module);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateData.success) {
        const err = new ValidationError(validateData.error);
        CustomLogger.error(`error validate response data:\n ${err}`);
        RecordLog(err, module);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let newNotification;
    try {
        newNotification = await ModelNotification.createNotification(validateData);
    } catch (error) {
        const err = new QueryErrors(error);
        CustomLogger.error(`error create notification:\n ${err}`);
        RecordLog(err, module);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(201).send(Responses.Successful({ notification: newNotification, token }, 'create notification success'));
};
