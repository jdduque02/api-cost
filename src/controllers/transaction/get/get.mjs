
import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors, AuthorizationError } from '../../../helpers/errors.mjs';
import { ModelTransaction } from '../../../db/models/transaction.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'transaction';
/**
 * Obtener todos las informaciones financieras
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con todas las informaciones financieras.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthorizationError, QueryErrors} Error al obtener todos las informaciones financieras.
 */
export const getAllTransaction = async (req, res = response) => {
    let { charge: { data }, token } = req;
    if (data.role !== 1) {
        const validateError = new AuthorizationError('you do not have the permissions to make this request');
        RecordLog(validateError, module);
        return res.status(401).send(Responses.Error(validateError.name, validateError.message));
    }
    let getAllTransaction;
    try {
        getAllTransaction = await ModelTransaction.getAllTransaction({});
    } catch (error) {
        let errorSearchTransaction = new QueryErrors(error);
        RecordLog(errorSearchTransaction, module);
        CustomLogger.error(`error:\n ${errorSearchTransaction.stack}`);
        return res.status(400).send(Responses.Error(errorSearchTransaction.name, errorSearchTransaction.message));
    }
    if (getAllTransaction.length === 0) {
        let errorSearchTransaction = new ResourceNotFoundError('sub Category not found');
        RecordLog(errorSearchTransaction, module);
        return res.status(400).send(Responses.Error(errorSearchTransaction.name, errorSearchTransaction.message));
    }
    return res.status(200).send(Responses.Successful({ transaction: getAllTransaction, token }, 'get all sub Category success'));
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
export const validateTransaction = async (req, res = response, next) => {
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
    let findTransaction;
    try {
        findTransaction = await ModelTransaction.getByIdTransaction(searchParams);
    } catch (error) {
        let errorSearchTransaction = new QueryErrors(error);
        RecordLog(errorSearchTransaction, module);
        CustomLogger.error(`error:\n ${errorSearchTransaction.stack}`);
        return res.status(400).send(Responses.Error(errorSearchTransaction.name, errorSearchTransaction.message));
    }
    if (Object.keys(findTransaction).length === 0) {
        let errorSearchTransaction = new ResourceNotFoundError('sub Category not found');
        RecordLog(errorSearchTransaction, module);
        return res.status(400).send(Responses.Error(errorSearchTransaction.name, errorSearchTransaction.message));
    }
    req.body.Transaction = findTransaction;
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
export const showTransaction = async (req, res = response) => {
    const { body, token } = req;
    const { Transaction } = body;
    return res.status(200).send(Responses.Successful({ transaction: Transaction, token }, 'show Transaction success'));
}