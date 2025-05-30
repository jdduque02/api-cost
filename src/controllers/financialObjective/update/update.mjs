import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ServerError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelFinancialObjective } from '../../../db/models/financialObjective.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { validateSchemaPartialFinancialObjective } from '../../../dataValidations/schema/financialObjective.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'financialObjective';
/**
 * Actualizar la informacion financiera
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la respuesta de la actualizacion.
 * 
 * @throws {ValidationError, QueryErrors, ServerError} Error al actualizar la informacion financiera.
 */
export const updateFinancialObjective = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    let { financialObjective } = body;
    delete body.financialObjective;
    let validateDataFinancialObjective;
    try {
        validateDataFinancialObjective = validateSchemaPartialFinancialObjective(body);
    } catch (error) {
        const err = new ServerError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataFinancialObjective.success) {
        const err = new ValidationError(validateDataFinancialObjective.error);
        RecordLog(err, module);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let { data } = validateDataFinancialObjective;
    body.update_at = today;
    if (data.payments)  {
        let change = [];
        change.push({daypayment: body.daypayment, amountPaid: body.amountPaid });
        data.payments = change;
    }
    try {
        await ModelFinancialObjective.updateFinancialObjective(financialObjective, data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({ financialObjective: data, token }, 'update financialObjective success'));
};

