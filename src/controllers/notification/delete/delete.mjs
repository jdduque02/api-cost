import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelNotification } from '../../../db/models/notification.mjs';
import { Responses } from '../../../helpers/response.mjs';
const module = 'notification';

/**
* Eliminar una categoria en la base de datos
* @param {Object} req - Objeto de solicitud HTTP
* @param {Object} res - Objeto de respuesta HTTP
* @returns {Object} - Objeto de respuesta HTTP con la categoria eliminada.
* 
* @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al categoria eliminada.
*/
export const deleteNotification = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    if (!req.params.key || !req.params.value) {
        const err = new ResourceNotFoundError('empty params');
        RecordLog(err, module);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    let deleteNotification;
    try {
        deleteNotification = await ModelNotification.deleteNotification(body.name);
    } catch (error) {
        const err = new QueryErrors(error);
        CustomLogger.error(`error query notification data:\n ${err}`);
        RecordLog(err, module);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({notification:deleteNotification, token}, 'delete notification success'));
}
