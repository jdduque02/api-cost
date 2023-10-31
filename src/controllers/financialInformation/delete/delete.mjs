import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelFinancialInformation } from '../../../db/models/financialInformation.mjs';
import { Responses } from '../../../helpers/response.mjs';
const { response, TIMEZONE } = modules;
import { zonedTimeToUtc } from 'date-fns-tz';

/**
 * Eliminar un usuario en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con el usuario eliminado.
 * 
 * @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al eliminar el usuario.
 */
export const deleteFinancialInformation = async (req, res = response) => {
    let today = new Date();
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    today.setUTCHours(today.getUTCHours() - 5);
    const { body } = req;
    //La declaración `if` verifica si el objeto `body` está vacío. Si está vacío, significa que el cuerpo de la solicitud no contiene ningún dato. En este caso, genera un `ResourceNotFoundError` con el mensaje 'cuerpo de petición vacío', registra el error usando `CustomLogger.error` y envía una respuesta con un código de estado de 400 y un mensaje de error usando `Responses.Error`.
    if (Object.keys(body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        CustomLogger.error(`error validate data:\n ${err}`);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si el número de claves en el objeto "cuerpo" es mayor que 1000. Si es así, significa que el cuerpo de la solicitud es demasiado grande. En este caso, devuelve inmediatamente una respuesta con un código de estado de 413 (Entidad de solicitud demasiado grande) y un mensaje de error que indica que el cuerpo de la solicitud es demasiado grande.
    if (Object.keys(body).length > 1000) return res.status(413).send(Responses.Error([], 'The body of the request is too large'));
    let deleteFinancialInformation;
    try {
        deleteFinancialInformation = await ModelFinancialInformation.deleteFinancialInformation(body.userId);
    } catch (error) {
        const err = new QueryErrors(error);
        CustomLogger.error(`error query financialInformation data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful(deleteFinancialInformation, 'delete financialInformation success'));
}