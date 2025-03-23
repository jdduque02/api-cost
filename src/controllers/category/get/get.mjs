import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors, ValidationError, AuthorizationError } from '../../../helpers/errors.mjs';
import { ModelCategory } from '../../../db/models/category.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { RecordLog } from '../../../helpers/logs.mjs';
import { response } from 'express';
import { validatePartialSchemaCategory } from '../../../dataValidations/schema/category.mjs';
const module = 'category';
/**
 * Obtener todas los categorias
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con todos los categorias.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthorizationError, QueryErrors} Error al obtener todos los categorias.
 */
export const getAllCategory = async (req, res = response) => {
    if (req.charge.role !== 1) {
        const AuthorizationNotValide = new AuthorizationError('you do not have permissions');
        RecordLog(AuthorizationNotValide, module);
        return res.status(401).send(Responses.Error(AuthorizationNotValide.name, AuthorizationNotValide.message));
    }
    let getAllCategory;
    try {
        getAllCategory = await ModelCategory.getAllCategory({});
    } catch (error) {
        let errorSearchCategory = new QueryErrors(error);
        RecordLog(errorSearchCategory, module);
        CustomLogger.error(`error:\n ${errorSearchCategory.stack}`);
        return res.status(400).send(Responses.Error(errorSearchCategory.name, errorSearchCategory.message));
    }
    if (getAllCategory.length === 0) {
        let errorSearchCategory = new ResourceNotFoundError('categorys not found');
        RecordLog(errorSearchCategory, module);
        return res.status(400).send(Responses.Error(errorSearchCategory.name, errorSearchCategory.message));
    }
    return res.status(200).send(Responses.Successful(getAllCategory, 'get all category success'));
}
/**
 * Consultar categorias en base el query
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Object} next - Objeto next HTTP
 * @returns {Object} - Objeto de respuesta HTTP con los categorias.
 * 
 * @throws { ResourceNotFoundError, AuthorizationError, QueryErrors} Error al consultar los categorias en la base de datos.
 */
export const validateCategory = async (req, res = response, next) => {
    if (!req.params.key || !req.params.value) {
        const err = new ResourceNotFoundError('empty params');
        RecordLog(err, module);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    const { body, params: { key, value } } = req;
    const searchParams = {};
    searchParams[key] = value;
    let validateData;
    try {
        validateData = validatePartialSchemaCategory(searchParams);
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
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let findCategory;
    try {
        findCategory = await ModelCategory.getByIdCategory(searchParams);
    } catch (error) {
        let errorSearchCategory = new QueryErrors(error);
        CustomLogger.error(`error:\n ${errorSearchCategory.stack}`);
        RecordLog(errorSearchCategory, module);
        return res.status(400).send(Responses.Error(errorSearchCategory.name, errorSearchCategory.message));
    }
    if (findCategory.length === 0) {
        let errorSearchCategory = new ResourceNotFoundError('categorys not found');
        RecordLog(errorSearchCategory, module);
        return res.status(400).send(Responses.Error(errorSearchCategory.name, errorSearchCategory.message));
    }
    req.body.category = findCategory;
    next();
}
/**
 * Mostrar categorias en base el query
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Object} next - Objeto next HTTP
 * @returns {Object} - Objeto de respuesta HTTP con los categorias.
 * 
 * @throws { ResourceNotFoundError, AuthorizationError, QueryErrors} Error al consultar los categorias en la base de datos.
 */
export const showCategory = async (req, res = response) => {
    //category
    const { body, token } = req;
    const { category } = body;
    return res.status(200).send(Responses.Successful({ category, token }, 'show category´s success'));
}