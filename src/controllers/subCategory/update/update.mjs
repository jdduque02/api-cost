import { randomUUID } from 'node:crypto'
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ServerError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelSubCategory } from '../../../db/models/subCategory.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { validateSchemaPartialSubCategory } from '../../../dataValidations/schema/subCategory.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'subCategory';
/**
 * Actualizar la informacion financiera
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la respuesta de la actualizacion.
 * 
 * @throws {ValidationError, QueryErrors, ServerError} Error al actualizar la informacion financiera.
 */
export const updateSubCategory = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    const { SubCategory } = body;
    delete body.SubCategory;
    let validateDataSubCategory;
    try {
        validateDataSubCategory = validateSchemaPartialSubCategory(body);
    } catch (error) {
        const err = new ServerError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataSubCategory.success) {
        const err = new ValidationError(validateDataSubCategory.error);
        RecordLog(err, module);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let { data } = validateDataSubCategory;
    body.update_at = today;
    let change = [];
    Object.entries(data).forEach(([key, value]) => {
        change.push({ _id: randomUUID(), modifiedVariable: key, dateModification: today, valuePrevious: SubCategory[key], valueNew: value });
    });
    data.changeData = change;
    try {
        await ModelSubCategory.updateSubCategory(SubCategory, data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({ subCategory: data, token }, 'update subCategory success'));
};
