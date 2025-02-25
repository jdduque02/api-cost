
import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors, AuthorizationError } from '../../../helpers/errors.mjs';
import { ModelSubCategory } from '../../../db/models/subCategory.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'subCategory';
/**
 * Obtener todos las informaciones financieras
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con todas las informaciones financieras.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthorizationError, QueryErrors} Error al obtener todos las informaciones financieras.
 */
export const getAllSubCategory = async (req, res = response) => {
    let { charge: { data }, token } = req;
    if (data.role !== 1) {
        const validateError = new AuthorizationError('you do not have the permissions to make this request');
        RecordLog(validateError, module);
        return res.status(401).send(Responses.Error(validateError.name, validateError.message));
    }
    let getAllSubCategory;
    try {
        getAllSubCategory = await ModelSubCategory.getAllSubCategory({});
    } catch (error) {
        let errorSearchSubCategory = new QueryErrors(error);
        RecordLog(errorSearchSubCategory, module);
        CustomLogger.error(`error:\n ${errorSearchSubCategory.stack}`);
        return res.status(400).send(Responses.Error(errorSearchSubCategory.name, errorSearchSubCategory.message));
    }
    if (getAllSubCategory.length === 0) {
        let errorSearchSubCategory = new ResourceNotFoundError('sub Category not found');
        RecordLog(errorSearchSubCategory, module);
        return res.status(400).send(Responses.Error(errorSearchSubCategory.name, errorSearchSubCategory.message));
    }
    return res.status(200).send(Responses.Successful({ subCategory: getAllSubCategory, token }, 'get all sub Category success'));
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
export const validateSubCategory = async (req, res = response, next) => {
    if (!req.params.key || !req.params.value) {
        const err = new ResourceNotFoundError('empty params');
        RecordLog(err, module);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    const { body, params: { key, value } } = req;
    const searchParams = {};
    searchParams[key] = value;
    let findSubCategory;
    try {
        findSubCategory = await ModelSubCategory.getByIdSubCategory(searchParams);
    } catch (error) {
        let errorSearchSubCategory = new QueryErrors(error);
        CustomLogger.error(`error:\n ${errorSearchSubCategory.stack}`);
        RecordLog(errorSearchSubCategory, module);
        return res.status(400).send(Responses.Error(errorSearchSubCategory.name, errorSearchSubCategory.message));
    }
    if (Object.keys(findSubCategory).length === 0) {
        let errorSearchSubCategory = new ResourceNotFoundError('sub Category not found');
        RecordLog(errorSearchSubCategory, module);
        return res.status(400).send(Responses.Error(errorSearchSubCategory.name, errorSearchSubCategory.message));
    }
    req.body.SubCategory = findSubCategory;
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
export const showSubCategory = async (req, res = response) => {
    const { body, token } = req;
    const { SubCategory } = body;
    return res.status(200).send(Responses.Successful({ subCategory: SubCategory, token }, 'show SubCategory success'));
}