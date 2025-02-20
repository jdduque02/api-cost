import jwt from 'jsonwebtoken';

import { response } from 'express';

import { Responses } from '../helpers/response.mjs'
import { ResourceNotFoundError, AuthorizationError, ServerError } from '../helpers/errors.mjs';
const { HASH_KEY_JWT } = process.env;

//La función `validateToken` es una función de middleware que se utiliza para validar y actualizar tokens JWT en una aplicación Express.
export const validateToken = (req, res = response, next) => {
    const { headers } = req;
    const token = headers['x-access-token'];
    if (!token) return res.status(400).send(Responses.Error(new ResourceNotFoundError('token does not exist in the header'), 'token does not exist in the header'));
    let verfyToken;
    try {
        verfyToken = jwt.verify(token, HASH_KEY_JWT);
    } catch (error) {
        const err = new ServerError(error.message);
        return res.status(500).send(Responses.Error(err.message, err.name));
    }
    if (!verfyToken) return res.status(401).send(Responses.Error(new AuthorizationError('token is not valid'), 'token is not valid'));
    let { data, iat } = verfyToken;
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    if (iat <= today.getTime()) {
        return res.status(401).send(Responses.Error(new AuthorizationError('token expired'), 'token expired'));
    }
    let expiresIn = today.setUTCHours(today.getUTCHours() + 2);
    let charge = {
        data,
        expiresIn,
        iat
    };
    let newToken;
    try {
        newToken = jwt.sign(charge, HASH_KEY_JWT);
    } catch (error) {
        const err = new ServerError(error);
        return res.status(500).send(Responses.Error(err.name, err.message));
    }
    req.charge = charge;
    req.token = newToken;
    next();
}