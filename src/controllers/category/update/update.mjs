import { CustomLogger } from '../../../helpers/console.mjs';
import {  QueryErrors, ValidationError, ServerError } from '../../../helpers/errors.mjs';
import { ModelCategory } from '../../../db/models/category.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'category';
import { validatePartialSchemaCategory } from '../../../dataValidations/schema/category.mjs';
/**
 * Actualizar la categoria
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la respuesta de la actualizacion.
 * 
 * @throws {ValidationError, QueryErrors, ServerError} Error al actualizar la categoria.
 */
export const updateCategory = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    if (Object.keys(body).length > 1000) {
        RecordLog('The body of the request is too large', module);
        return res.status(413).send(Responses.Error([], 'The body of the request is too large'));
    }
    let { category } = body;
    delete body.category;
    let validateDataCategory;
    try {
        validateDataCategory = validatePartialSchemaCategory(body);
    } catch (error) {
        const err = new ServerError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataCategory.success) {
        const err = new ValidationError(validateDataCategory.error);
        RecordLog(err, module);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let { data } = validateDataCategory;
    body.update_at = today;
    try {
        await ModelCategory.updateCategory(category, data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({category:data, token}, 'update category success'));
};