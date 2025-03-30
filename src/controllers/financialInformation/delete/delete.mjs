import { response } from 'express';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelFinancialInformation } from '../../../db/models/financialInformation.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'financialInformation';
/**
 * Eliminar un usuario en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con el usuario eliminado.
 * 
 * @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al eliminar el usuario.
 */
export const removeFinancialInformation = async (req, res = response) => {
    let today = new Date();
    console.log({ today });
    today.setUTCHours(today.getUTCHours() - 5);
    const { params, token } = req;
    const { key, value } = params;
    const searchParams = {};
    searchParams[key] = value;
    let deleteFinancialInformation;
    try {
        deleteFinancialInformation = await ModelFinancialInformation.deleteFinancialInformation(searchParams);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error query financialInformation data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({ financialInformation: deleteFinancialInformation, token }, 'delete financialInformation success'));
}