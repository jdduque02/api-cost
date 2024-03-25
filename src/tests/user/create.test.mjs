/* import * as modules from '../modules.mjs';
import express from 'express';
import request from 'supertest';
const app = express();
const { VERSION } = modules;

const BASEURL = `/api/v${VERSION}`;
const routeCreateUser = `${BASEURL}/user/create/`;
describe(`POST ${routeCreateUser}`, () => {
    const userCreate = {
        username: 'admin',
        password: 'admin',
        email: 'textExample@gmail.com',
        numberPhone: 3100046790,
        role: 1,
    };
    test('to be answered by the state 200', async () => {
        console.log(routeCreateUser);
        const queryRequest = await request(app).post(`${routeCreateUser}`).send(userCreate);
        const statusCode = queryRequest ? queryRequest.statusCode : undefined;
        expect(statusCode).toBe(200);
    })
})*/