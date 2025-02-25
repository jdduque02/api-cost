import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors, AuthorizationError } from '../../../helpers/errors.mjs';
import { ModelFinancialInformation } from '../../../db/models/financialInformation.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { response } from 'express';
/**
 * Obtener todos las informaciones financieras
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con todas las informaciones financieras.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthorizationError, QueryErrors} Error al obtener todos las informaciones financieras.
 */
export const getAllFinancialInformation = async (req, res = response) => {
    let { charge: { data } } = req;
    if (data.role !== 1) {
        const validateError = new AuthorizationError('you do not have the permissions to make this request');
        return res.status(401).send(Responses.Error(validateError.name, validateError.message));
    }
    let getAllFinancialInformation;
    try {
        getAllFinancialInformation = await ModelFinancialInformation.getAllFinancialInformation({});
    } catch (error) {
        let errorSearchFinancialInformation = new QueryErrors(error);
        CustomLogger.error(`error:\n ${errorSearchFinancialInformation.stack}`);
        return res.status(400).send(Responses.Error(errorSearchFinancialInformation.name, errorSearchFinancialInformation.message));
    }
    if (getAllFinancialInformation.length === 0) {
        let errorSearchFinancialInformation = new ResourceNotFoundError('financial Information not found');
        return res.status(400).send(Responses.Error(errorSearchFinancialInformation.name, errorSearchFinancialInformation.message));
    }
    return res.status(200).send(Responses.Successful(getAllFinancialInformation, 'get all financial Information success'));
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
export const validateFinancialInformation = async (req, res = response, next) => {
    if (!req.params.key || !req.params.value) {
        const err = new ResourceNotFoundError('empty params');
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    const { body, params: { key, value } } = req;
    const searchParams = {};
    searchParams[key] = value;
    let findFinancialInformation;
    try {
        findFinancialInformation = await ModelFinancialInformation.getByIdFinancialInformation(searchParams);
    } catch (error) {
        let errorSearchFinancialInformation = new QueryErrors(error);
        CustomLogger.error(`error:\n ${errorSearchFinancialInformation.stack}`);
        return res.status(400).send(Responses.Error(errorSearchFinancialInformation.name, errorSearchFinancialInformation.message));
    }
    if (Object.keys(findFinancialInformation).length === 0) {
        let errorSearchFinancialInformation = new ResourceNotFoundError('financial Information not found');
        return res.status(400).send(Responses.Error(errorSearchFinancialInformation.name, errorSearchFinancialInformation.message));
    }
    req.body.financialInformation = findFinancialInformation;
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
export const showFinancialInformation = async (req, res = response) => {
    const { body, token } = req;
    const { financialInformation } = body;
    return res.status(200).send(Responses.Successful({ financialInformation, token }, 'show FinancialInformation success'));
}