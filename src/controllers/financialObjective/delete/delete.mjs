import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelFinancialObjective } from '../../../db/models/financialObjective.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { RecordLog } from '../../../helpers/logs.mjs';
import { response } from 'express';
const module = 'financialObjective';
/**
 * Eliminar un usuario en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con el usuario eliminado.
 * 
 * @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al eliminar el usuario.
 */
export const deleteFinancialObjective = async (req, res = response) => {
    const { body, token } = req;
    let deleteFinancialObjective;
    try {
        deleteFinancialObjective = await ModelFinancialObjective.deleteFinancialObjective(body.userId);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error query financialObjective data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({ financialObjective: deleteFinancialObjective, token }, 'delete financialObjective success'));
}