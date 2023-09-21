/* import * as modules from '../modules.mjs';

const {app,  VERSION, request } = modules;

const BASEURL = `/api/v${VERSION}`;
const routeCreateUser = `${BASEURL}/user/create/`;
describe(`POST ${routeCreateUser}`, () => {
    const userCreate = {
        username: 'admin',
        password: 'admin',
        email: 'textExample@gmail.com',
        numberPhone: 3100046790,
        role:1,
    };
    test('to be answered by the state 200', async () => {
        const queryRequest = await request(app).post(`POST ${routeCreateUser}`).send(userCreate);
        expect(queryRequest.statusCode).toBe(200);
    })
})
 */