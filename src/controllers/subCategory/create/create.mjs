import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelSubCategory } from '../../../db/models/subCategory.mjs';
import { validateSchemaSubCategory } from '../../../dataValidations/schema/subCategory.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'subCategory';
/**
 * Registrar la sub categoria de un usuario en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la sub categoria de un usuario creada.
 * 
 * @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al crear la sub categoria.
 */
export const createSubCategory = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    body.created_at = today;
    body.update_at = today;
    //  El bloque de código intenta validar los datos recibidos en el cuerpo de la solicitud utilizando la función `validateSchemaSubCategory`.
    let validateData;
    try {
        validateData = validateSchemaSubCategory(body);
    } catch (error) {
        const err = new ValidationError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateData.success) {
        const err = new ValidationError(validateData.error);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    //El bloque de código intenta crear un nuevo usuario utilizando el método `ModelUser.createUser`.
    let newSubCategory;
    try {
        newSubCategory = await ModelSubCategory.createSubCategory(validateData.data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error create  Financial Objective:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(201).send(Responses.Successful({ subCategory: newSubCategory, token }, 'create Financial Objective success'));
}