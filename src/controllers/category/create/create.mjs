import * as modules from '../modules.mjs';
const { /* Category, CustomLogger, Responses, */ ValidationError, response, validateSchema, TIMEZONE, dateFns } = modules;

/**
 * Crea una nueva alerta en la base de datos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con la alerta creada.
 * 
 * @throws {Error} Error al crear la alerta.
 */
export const createCategory = async (req, res = response) => {
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
