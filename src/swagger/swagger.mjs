import path from 'node:path';
export default {
    openapi: '3.0.0',
    info: {
        title: 'Management Expenditure Income',
        version: '0.6.0',
        description: 'The project will be developed in phases, starting with building a robust API-REST using Node.js and Express.js for the server logic and MongoDB for the database. API documentation will be managed using Swagger. In addition, extensive testing will be applied to ensure the quality and security of the system.',
        contact: {
            name: 'API Support',
            email: '',
        },
    },
    apis: [` ${path.join(import.meta.url, './route/*.js')} `],
};