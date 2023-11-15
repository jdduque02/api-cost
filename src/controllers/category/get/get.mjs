import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ResourceNotFoundError, QueryErrors, ValidationError } from '../../../helpers/errors.mjs';
import { ModelCategory } from '../../../db/models/category.mjs';
import { Responses } from '../../../helpers/response.mjs';
const { response } = modules;
import { validatePartialSchemaCategory } from '../../../dataValidations/schema/category.mjs';
/**
 * Obtener todas los categorias
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con todos los categorias.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthorizationError, QueryErrors} Error al obtener todos los categorias.
 */
export const getAllCategory = async (req, res = response) => {
    let getAllCategory;
    try {
        getAllCategory = await ModelCategory.getCategory({});
    } catch (error) {
        let errorSearchCategory = new QueryErrors(error);
        CustomLogger.error(`error:\n ${errorSearchCategory.stack}`);
        return res.status(400).send(Responses.Error(errorSearchCategory.name, errorSearchCategory.message));
    }
    if (getAllCategory.length === 0) {
        let errorSearchCategory = new ResourceNotFoundError('categorys not found');
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
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    const { body, params: { key, value } } = req;
    if (Object.keys(body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si el número de claves en el objeto "cuerpo" es mayor que 1000. Si es así, significa que el cuerpo de la solicitud es demasiado grande. En este caso, devuelve inmediatamente una respuesta con un código de estado de 413 (Entidad de solicitud demasiado grande) y un mensaje de error que indica que el cuerpo de la solicitud es demasiado grande.
    if (Object.keys(body).length > 1000) return res.status(413).send(Responses.Error([], 'The body of the request is too large'));
    const searchParams = {};
    searchParams[key] = value;
    let validateData;
    try {
        validateData = (searchParams);
    } catch (error) {
        const err = new validatePartialSchemaCategory(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
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
        findCategory = await ModelCategory.getOneCategory(searchParams);
    } catch (error) {
        let errorSearchCategory = new QueryErrors(error);
        CustomLogger.error(`error:\n ${errorSearchCategory.stack}`);
        return res.status(400).send(Responses.Error(errorSearchCategory.name, errorSearchCategory.message));
    }
    if (findCategory.length === 0) {
        let errorSearchCategory = new ResourceNotFoundError('categorys not found');
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
    const { category } = req.body;
    return res.status(200).send(Responses.Successful(category, 'show category´s success'));
}