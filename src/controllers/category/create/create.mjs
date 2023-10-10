/* import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ResourceNotFoundError, QueryErrors } from '../../../helpers/errors.mjs';
import { ModelCategory } from '../../../db/models/category.mjs';
import { Responses } from '../../../helpers/response.mjs';
const { response, TIMEZONE } = modules;
import { validateSchemaUser } from '../../../dataValidations/schema/category.mjs';
import { zonedTimeToUtc } from 'date-fns-tz';
 */
/**
 * Crea una nueva categoria en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la alerta creada.
 * 
 * @throws {Error} Error al crear la alerta.
 */
/* export const createCategory = async (req, res = response) => {
    const today = new Date();
    dateFns.setZone(today, TIMEZONE);
    const { body } = req;
    body.created_at = today;
    body.update_at = today;
    let validateData;
    try {
        validateData = validateSchema(body);
    } catch (error) {
        return res.status(422).send(error instanceof ValidationError)
    }
    return res.send(validateData)
};
 */