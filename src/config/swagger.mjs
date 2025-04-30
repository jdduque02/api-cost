//import path from 'node:path';
export const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Management Expenditure Income',
            version: '1.2.0',
            description: 'The project will be developed in phases, starting with building a robust API-REST using Node.js and Express.js for the server logic and MongoDB for the database. API documentation will be managed using Swagger. In addition, extensive testing will be applied to ensure the quality and security of the system.',
            contact: {
                name: 'API Support',
                email: '',
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            },
            /* {
                url: "<your live url here>",
                description: "Live server"
            }, */
        ]
    },
    // looks for configuration in specified directories
    apis: ['./src/routes/*.mjs'],
}