import * as modules from '../modules.mjs';
import { CustomLogger } from '../../../helpers/console.mjs';
import { ValidationError, ServerError, ResourceNotFoundError } from '../../../helpers/errors.mjs';
import { ModelUser } from '../../../db/models/user.mjs';
import { Responses } from '../../../helpers/response.mjs';
const { response, TIMEZONE } = modules;
import { validateSchemaUser } from '../../../dataValidations/schema/user.mjs';
import { zonedTimeToUtc } from 'date-fns-tz';

//La función `createUser` es una función asincrónica que maneja la creación de un usuario. Toma dos parámetros, `req` y `res`, que representan los objetos de solicitud y respuesta respectivamente.
export const createUser = async (req, res = response) => {
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
    if (Object.keys(body).length > 1000) return res.status(413).send(Responses.Error('El cuerpo de la solicitud es demasiado grande'));
    body.created_at = today;
    body.update_at = today;
    body.last_conect = today;
    body.state = true;
    body.imgProfile = '';
    let validateData;
    //  El bloque de código intenta validar los datos recibidos en el cuerpo de la solicitud utilizando la función `validateSchemaUser`.
    try {
        validateData = validateSchemaUser(body);
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
    //El bloque de código intenta crear un nuevo usuario utilizando el método `ModelUser.createUser`.
    let newUser;
    try {
        newUser = await ModelUser.createUser(validateData.data);
    } catch (error) {
        const err = new ServerError(error);
        CustomLogger.error(`error create user:\n ${err}`);
        return res.status(500).send(Responses.Error(err.name, 'error in the create user'));
    }
    return res.status(201).send(Responses.Successful(newUser));
}