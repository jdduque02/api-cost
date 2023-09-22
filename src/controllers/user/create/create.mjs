import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ServerError, ResourceNotFoundError } from '../../../helpers/errors.mjs';
import { ModelUser } from '../../../db/models/user.mjs';
import { Responses } from '../../../helpers/response.mjs';
const { response } = modules;
import { validateSchemaPartialUser } from '../../../dataValidations/schema/user.mjs';
//createUser
export const createUser = async (req, res = response) => {
    const today = new Date();
    const { body } = req;
    if (Object.keys(body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        CustomLogger.error(err);
        return res.status(400).send(Responses.Error(err.name, 'empty petition body'));
    }
    body.created_at = today;
    body.update_at = today;
    let validateData;
    try {
        validateData = validateSchemaPartialUser(body);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(err);
        return res.status(500).send(Responses.Error(err.name, 'error in the validation of information'));
    }
    if (!validateData.success) {
        const err = new ValidationError(validateData.error);
        CustomLogger.error(err);
        return res.status(422).send(Responses.Error(err.name, 'structure of the body of the request is incorrect'));
    }
    let newUser;
    try {
        newUser = await ModelUser.createUser(validateData.data);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(err);
        return res.status(500).send(Responses.Error(err.name, 'error in the create user'));
    }
    console.log(newUser)
    return res.status(201).send(Responses.Successful(newUser));
}