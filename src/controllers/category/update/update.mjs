import dotenv from 'dotenv';
import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import {  QueryErrors, ValidationError, ServerError } from '../../../helpers/errors.mjs';
import { ModelCategory } from '../../../db/models/category.mjs';
import { Responses } from '../../../helpers/response.mjs';
const { response } = modules;
import { zonedTimeToUtc } from 'date-fns-tz';
import { pathEnv } from '../../../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE } = env;
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
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    today.setUTCHours(today.getUTCHours() - 5);
    const { body } = req;
    let { category } = body;
    delete body.category;
    let validateDataCategory;
    try {
        validateDataCategory = validatePartialSchemaCategory(body);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataCategory.success) {
        const err = new ValidationError(validateDataCategory.error);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let { data } = validateDataCategory;
    body.update_at = today;
    try {
        await ModelCategory.updateCategory(category, data);
    } catch (error) {
        const err = new QueryErrors(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful(data, 'update category success'));
};