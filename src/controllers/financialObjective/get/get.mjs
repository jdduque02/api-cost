import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors, AuthorizationError } from '../../../helpers/errors.mjs';
import { ModelFinancialObjective } from '../../../db/models/financialObjective.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'financialObjective';
/**
 * Obtener todos las informaciones financieras
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con todas las informaciones financieras.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthorizationError, QueryErrors} Error al obtener todos las informaciones financieras.
 */
export const getAllFinancialObjective = async (req, res = response) => {
    let { charge: { data } } = req;
    if (data.role !== 1) {
        const validateError = new AuthorizationError('you do not have the permissions to make this request');
        RecordLog(validateError, module);
        return res.status(401).send(Responses.Error(validateError.name, validateError.message));
    }
    let getAllFinancialObjective;
    try {
        getAllFinancialObjective = await ModelFinancialObjective.getAllFinancialObjective({});
    } catch (error) {
        let errorSearchFinancialObjective = new QueryErrors(error);
        RecordLog(errorSearchFinancialObjective, module);
        CustomLogger.error(`error:\n ${errorSearchFinancialObjective.stack}`);
        return res.status(400).send(Responses.Error(errorSearchFinancialObjective.name, errorSearchFinancialObjective.message));
    }
    if (getAllFinancialObjective.length === 0) {
        let errorSearchFinancialObjective = new ResourceNotFoundError('financial Objective not found');
        RecordLog(errorSearchFinancialObjective, module);
        return res.status(400).send(Responses.Error(errorSearchFinancialObjective.name, errorSearchFinancialObjective.message));
    }
    return res.status(200).send(Responses.Successful(getAllFinancialObjective, 'get all financial Objective success'));
}
/**
 * Consultar informacion financiera en base el query
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Object} next - Objeto next HTTP
 * @returns {Object} - Objeto de respuesta HTTP las informaciones financieras.
 * 
 * @throws { ResourceNotFoundError, AuthorizationError, QueryErrors} Error al consultar los informacion financiera en la base de datos.
 */
export const validateFinancialObjective = async (req, res = response, next) => {
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
    let findFinancialObjective;
    try {
        findFinancialObjective = await ModelFinancialObjective.getByIdFinancialObjective(searchParams);
    } catch (error) {
        let errorSearchFinancialObjective = new QueryErrors(error);
        CustomLogger.error(`error:\n ${errorSearchFinancialObjective.stack}`);
        RecordLog(errorSearchFinancialObjective, module);
        return res.status(400).send(Responses.Error(errorSearchFinancialObjective.name, errorSearchFinancialObjective.message));
    }
    if (Object.keys(findFinancialObjective).length === 0) {
        let errorSearchFinancialObjective = new ResourceNotFoundError('financial Objective not found');
        RecordLog(errorSearchFinancialObjective, module);
        return res.status(400).send(Responses.Error(errorSearchFinancialObjective.name, errorSearchFinancialObjective.message));
    }
    req.body.financialObjective = findFinancialObjective;
    next();
}
/**
 * Mostrar Informacion Financiera en base el query
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Object} next - Objeto next HTTP
 * @returns {Object} - Objeto de respuesta HTTP con los Informacion Financiera.
 * 
 * @throws { ResourceNotFoundError, AuthorizationError, QueryErrors} Error al consultar los Informacion Financiera en la base de datos.
 */
export const showFinancialObjective = async (req, res = response) => {
    const { body, token } = req;
    const { financialObjective } = body;
    return res.status(200).send(Responses.Successful({ financialObjective, token }, 'show FinancialObjective success'));
}