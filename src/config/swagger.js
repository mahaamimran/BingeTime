// src/config/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BingeTime API',
      version: '1.0.0',
      description: 'API documentation for BingeTime',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpecs = swaggerJsDoc(options);
module.exports = swaggerSpecs;
