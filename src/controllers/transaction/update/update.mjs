import { randomUUID } from 'node:crypto'
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ServerError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelTransaction } from '../../../db/models/transaction.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { validateSchemaPartialTransaction } from '../../../dataValidations/schema/transaction.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'transaction';
/**
 * Actualizar la informacion financiera
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la respuesta de la actualizacion.
 * 
 * @throws {ValidationError, QueryErrors, ServerError} Error al actualizar la informacion financiera.
 */
export const updateTransaction = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    let { transaction } = body;
    delete body.transaction;
    if (Object.keys(body).length > 1000) {
        RecordLog('The body of the request is too large', module);
        return res.status(413).send(Responses.Error([], 'The body of the request is too large'));
    }
    let validateDataTransaction;
    try {
        validateDataTransaction = validateSchemaPartialTransaction(body);
    } catch (error) {
        const err = new ServerError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataTransaction.success) {
        const err = new ValidationError(validateDataTransaction.error);
        RecordLog(err, module);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    let { data } = validateDataTransaction;
    body.update_at = today;
    let change = [];
    Object.entries(data).forEach(([key, value]) => {
        change.push({ _id: randomUUID(), modifiedVariable: key, dateModification: today, valuePrevious: transaction[key], valueNew: value });
    });
    data.changeData = change;
    try {
        await ModelTransaction.updateTransaction(transaction, data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful({transaction:data, token}, 'update transaction success'));
};
