

import dotenv from 'dotenv';
import { zonedTimeToUtc } from 'date-fns-tz';
import { randomUUID } from 'node:crypto'
import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { pathEnv } from '../../../middleware/dontenv.mjs';
import { ValidationError, ServerError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelTransaction } from '../../../db/models/transaction.mjs';
import { Responses } from '../../../helpers/response.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE } = env;
const { response } = modules;
import { validateSchemaPartialTransaction } from '../../../dataValidations/schema/transaction.mjs';
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
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    today.setUTCHours(today.getUTCHours() - 5);
    const { body } = req;
    let { transaction } = body;
    delete body.transaction;
    let validateDataTransaction;
    try {
        validateDataTransaction = validateSchemaPartialTransaction(body);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateDataTransaction.success) {
        const err = new ValidationError(validateDataTransaction.error);
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
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(200).send(Responses.Successful(data, 'update transaction success'));
};
