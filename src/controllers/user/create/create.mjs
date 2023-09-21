import * as modules from '../modules.mjs';
const { /* User, CustomLogger, Responses, */ ValidationError, response, validateSchemaUser, TIMEZONE, dateFns } = modules;
//createUser
export const createUser = async (req, res = response) => {
    const today = new Date();
    dateFns.setZone(today, TIMEZONE);
    const { body } = req;
    body.created_at = today;
    body.update_at = today;
    let validateData;
    try {
        validateData = validateSchemaUser(body);
    } catch (error) {
        return res.status(422).send(error instanceof ValidationError)
    }
    return res.send(validateData)
}