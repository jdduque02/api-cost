
import * as modules from '../modules.mjs';
import dotenv from 'dotenv';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelFinancialObjective } from '../../../db/models/financialObjective.mjs';
import { validateSchemaFinancialObjective } from '../../../dataValidations/schema/financialObjective.mjs';
import { Responses } from '../../../helpers/response.mjs';
import { pathEnv } from '../../../middleware/dontenv.mjs';
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { TIMEZONE } = env;
import { zonedTimeToUtc } from 'date-fns-tz';
const { response } = modules;

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
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    today.setUTCHours(today.getUTCHours() - 5);
    const { body } = req;
    //La declaración `if` verifica si el objeto `body` está vacío. Si está vacío, significa que el cuerpo de la solicitud no contiene ningún dato. En este caso, genera un `ResourceNotFoundError` con el mensaje 'cuerpo de petición vacío', registra el error usando `CustomLogger.error` y envía una respuesta con un código de estado de 400 y un mensaje de error usando `Responses.Error`.
    if (Object.keys(body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        CustomLogger.error(`error validate data:\n ${err}`);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si el número de claves en el objeto "cuerpo" es mayor que 1000. Si es así, significa que el cuerpo de la solicitud es demasiado grande. En este caso, devuelve inmediatamente una respuesta con un código de estado de 413 (Entidad de solicitud demasiado grande) y un mensaje de error que indica que el cuerpo de la solicitud es demasiado grande.
    if (Object.keys(body).length > 1000) return res.status(413).send(Responses.Error([], 'The body of the request is too large'));
    body.created_at = today;
    body.update_at = today;
    //  El bloque de código intenta validar los datos recibidos en el cuerpo de la solicitud utilizando la función `validateSchemaFinancialObjective`.
    let validateData;
    try {
        validateData = validateSchemaFinancialObjective(body);
    } catch (error) {
        const err = new ValidationError(error);
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
    let newFinancialObjective;
    try {
        newFinancialObjective = await ModelFinancialObjective.createFinancialObjective(validateData.data);
    } catch (error) {
        const err = new QueryErrors(error);
        CustomLogger.error(`error create  Financial Objective:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    return res.status(201).send(Responses.Successful(newFinancialObjective, 'create Financial Objective success'));
}