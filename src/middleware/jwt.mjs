/* import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {response} from 'express';
import { pathEnv } from '../middleware/dontenv.mjs';
import {Responses} from '../helpers/response.mjs'
import {ResourceNotFoundError, AuthorizationError} from '../helpers/errors.mjs'
let env = dotenv.config({ path: pathEnv });
env = env.parsed;
const { HASH_KEY_USER } = env;

const validateToken = (req, res = response, next) => {
    const {headers} =req;
    const TOKEN = headers['X-ACCESS-TOKEN'];
    const ValidationErrorTokenExists = new ResourceNotFoundError('token does not exist in the header');
    if (!TOKEN) return res.status(400).send(Responses.Error(ValidationErrorTokenExists, 'token does not exist in the header'));
    try {
        const verfyToken = jwt.verify(TOKEN, HASH_KEY_USER);
    } catch (error) {
        
    }
}

export default validateToken; */