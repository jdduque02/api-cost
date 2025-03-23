import { randomUUID } from 'node:crypto'
import { response } from 'express';
import { CustomLogger } from '../../../helpers/console.mjs';
import { RecordLog } from '../../../helpers/logs.mjs';
import { ValidationError, ServerError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelFinancialInformation } from '../../../db/models/financialInformation.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { validateSchemaPartialFinancialInformation } from '../../../dataValidations/schema/financialInformation.mjs';
const module = 'financialInformation';
/**
 * Actualizar la informacion financiera
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la respuesta de la actualizacion.
 * 
 * @throws {ValidationError, QueryErrors, ServerError} Error al actualizar la informacion financiera.
 */
export const updateFinancialInformation = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    let { financialInformation } = body;
    delete body.financialInformation;
    let validateDataFinancialInformation;
    try {
        validateDataFinancialInformation = validateSchemaPartialFinancialInformation(body);
    } catch (error) {
        const err = new ServerError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataFinancialInformation.success) {
        const err = new ValidationError(validateDataFinancialInformation.error);
        RecordLog(err, module);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let { data } = validateDataFinancialInformation;
    body.update_at = today;
    let change = [];
    Object.entries(data).forEach(([key, value]) => {
        change.push({ _id: randomUUID(), modifiedVariable: key, dateModification: today, valuePrevious: financialInformation[key], valueNew: value });
    });
    data.ChangeHistory = change;
    try {
        await ModelFinancialInformation.updateFinancialInformation(financialInformation, data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({ financialInformation: data, token }, 'update financialInformation success'));
};