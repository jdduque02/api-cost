import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { zonedTimeToUtc } from 'date-fns-tz';
import { response } from 'express';
import { pathEnv } from '../middleware/dontenv.mjs';
import { Responses } from '../helpers/response.mjs'
import { ResourceNotFoundError, AuthorizationError, ServerError } from '../helpers/errors.mjs'
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { HASH_KEY_JWT, TIMEZONE } = env;

//La función `validateToken` es una función de middleware que se utiliza para validar y actualizar tokens JWT en una aplicación Express.
const validateToken = (req, res = response, next) => {
    const { headers } = req;
    const TOKEN = headers['x-access-token'];
    let tokenWeb =HASH_KEY_JWT ?? 'ProvicinalToken';
    const ValidationErrorTokenExists = new ResourceNotFoundError('token does not exist in the header');
    if (!TOKEN) return res.status(400).send(Responses.Error(ValidationErrorTokenExists, 'token does not exist in the header'));
    let verfyToken
    try {
        verfyToken = jwt.verify(TOKEN, tokenWeb);
    } catch (error) {
        const ValidationError = new ServerError(error.message);
        return res.status(500).send(Responses.Error(ValidationError.message, ValidationError.name));
    }
    let { data, iat } = verfyToken;
    let today = new Date();
    today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
    if (iat <= today.getTime()) {
        const tokenValidityValidationError = new AuthorizationError('token expired');
        return res.status(401).send(Responses.Error(tokenValidityValidationError.name, tokenValidityValidationError.message));
    }
    let expiresIn = today.setUTCHours(today.getUTCHours() + 2);
    let charge = {
        data,
        expiresIn,
        iat
    };
   
    let newToken;
    try {
        newToken = jwt.sign(charge, tokenWeb);
    } catch (error) {
        const err = new ServerError(error);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    req.charge = charge;
    req.token = newToken;
    next();
}

export default validateToken;