/* import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ServerError, ResourceNotFoundError } from '../../../helpers/errors.mjs';
import { ModelUser } from '../../../db/models/user.mjs';
import { Responses } from '../../../helpers/response.mjs';
const { response, TIMEZONE, HASH_KEY_USER} = modules;
import { validateSchemaPartialUser } from '../../../dataValidations/schema/user.mjs';
import { zonedTimeToUtc } from 'date-fns-tz';

export const loginUser = async (req, res = response) => {
    let today = new Date();
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    const { body } = req;
    //La declaración `if` verifica si el objeto `body` está vacío. Si está vacío, significa que el cuerpo de la solicitud no contiene ningún dato. En este caso, genera un `ResourceNotFoundError` con el mensaje 'cuerpo de petición vacío', registra el error usando `CustomLogger.error` y envía una respuesta con un código de estado de 400 y un mensaje de error usando `Responses.Error`.
    if (Object.keys(body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        CustomLogger.error(`error validate data:\n ${err}`);
        return res.status(400).send(Responses.Error(err.name, 'empty petition body'));
    }
    //La declaración "if" verifica si el número de claves en el objeto "cuerpo" es mayor que 1000. Si es así, significa que el cuerpo de la solicitud es demasiado grande. En este caso, devuelve inmediatamente una respuesta con un código de estado de 413 (Entidad de solicitud demasiado grande) y un mensaje de error que indica que el cuerpo de la solicitud es demasiado grande.
    if (Object.keys(body).length > 1000) return res.status(413).send(Responses.Error('The body of the request is too large'));
    //  El bloque de código intenta validar los datos recibidos en el cuerpo de la solicitud utilizando la función `validateSchemaUser`.
    let validateData;
    try {
        validateData = validateSchemaPartialUser(body);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error validate schema data:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, 'error in the validation of information'));
    }
    //La declaración "if" verifica si la propiedad "validateData.success" es "falsa". Si es "falso", significa que la validación de datos falló.
    if (!validateData.success) {
        const err = new ValidationError(validateData.error);
        CustomLogger.error(`error validate response data:\n ${err}`);
        return res.status(422).send(Responses.Error(err.name, 'structure of the body of the request is incorrect'));
    }
    const {data:{username, password}} = validateData;
    let searchUser;
    try {
        //{update_at:0, created_at:0, changeHistoryUser:0, last_conect:0}
        searchUser = await ModelUser.getUser({username}, {update_at:0, created_at:0, changeHistoryUser:0, last_conect:0});
    } catch (error) {
        const err = new ResourceNotFoundError('User not found');
        CustomLogger.error(`error:\n ${error}`);
        return res.status(400).send(Responses.Error(err.name, 'User not found'));
    }
    return res.send(searchUser);
} */