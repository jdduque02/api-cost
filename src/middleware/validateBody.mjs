import { response } from 'express';

import { Responses } from '../helpers/response.mjs'
import { CustomLogger } from '../helpers/console.mjs'
import { RecordLog } from '../helpers/logs.mjs'
import { ResourceNotFoundError } from '../helpers/errors.mjs';

export default (req, res = response, next) => {
    if (req.method === 'GET' || req.method === 'PATCH') return next();
    if (Object.keys(req.body).length === 0) {
        const err = new ResourceNotFoundError('empty petition body');
        CustomLogger.error(`error validate data:\n ${err}`);
        return res.status(400).send(Responses.Error(err.name, err.message));
    }
    //La declaración "if" verifica si el número de claves en el objeto "cuerpo" es mayor que 1000. Si es así, significa que el cuerpo de la solicitud es demasiado grande. En este caso, devuelve inmediatamente una respuesta con un código de estado de 413 (Entidad de solicitud demasiado grande) y un mensaje de error que indica que el cuerpo de la solicitud es demasiado grande.
    if (Object.keys(req.body).length > 1000) {
        RecordLog('The body of the request is too large', module);
        return res.status(413).send(Responses.Error([], 'The body of the request is too large'));
    }
    next();
};