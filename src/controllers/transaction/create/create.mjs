import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelTransaction } from '../../../db/models/transaction.mjs';
import { validateSchemaTransaction } from '../../../dataValidations/schema/transaction.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { response } from 'express';
import { RecordLog } from '../../../helpers/logs.mjs';
const module = 'transaction';

/**
 * Registrar la transaction en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la transaction creada.
 * 
 * @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al crear la informacion finaciera.
 */
export const createTransaction = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    body.created_at = today;
    body.update_at = today;
    //  El bloque de código intenta validar los datos recibidos en el cuerpo de la solicitud utilizando la función `validateSchemaTransaction`.
    let validateData;
    try {
        validateData = validateSchemaTransaction(body);
    } catch (error) {
        const err = new ValidationError(error);
        RecordLog(err, module);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateData.success) {
        const err = new ValidationError(validateData.error);
        RecordLog(err, module);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, err.message));
    }
    //El bloque de código intenta crear un nuevo transaction utilizando el método `ModelTransaction.createTransaction`.
    let newTransaction;
    try {
        newTransaction = await ModelTransaction.createTransaction(validateData.data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error create Transaction:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(201).send(Responses.Successful({ trasaction: newTransaction, token }, 'create Transaction success'));
}