import { response } from 'express';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelFinancialObjective } from '../../../db/models/financialObjective.mjs';
import { validateSchemaFinancialObjective } from '../../../dataValidations/schema/financialObjective.mjs';
import { RecordLog } from '../../../helpers/logs.mjs';
import { Responses } from '../../../helpers/response.mjs';
const module = 'financialObjective';

/**
 * Registrar la informacion financiera de un usuario en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la informacion financiera de un usuario creada.
 * 
 * @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al crear la informacion finaciera.
 */
export const createFinancialObjective = async (req, res = response) => {
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    const { body, token } = req;
    body.created_at = today;
    body.update_at = today;
    //  El bloque de código intenta validar los datos recibidos en el cuerpo de la solicitud utilizando la función `validateSchemaFinancialObjective`.
    let validateData;
    try {
        validateData = validateSchemaFinancialObjective(body);
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
    //El bloque de código intenta crear un nuevo usuario utilizando el método `ModelUser.createUser`.
    let newFinancialObjective;
    try {
        newFinancialObjective = await ModelFinancialObjective.createFinancialObjective(validateData.data);
    } catch (error) {
        const err = new QueryErrors(error);
        RecordLog(err, module);
        CustomLogger.error(`error create  Financial Objective:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(201).send(Responses.Successful({ financialObjective: newFinancialObjective, token }, 'create Financial Objective success'));
}