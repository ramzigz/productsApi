import swaggerJSDoc from 'swagger-jsdoc';

/**
 * Swagger definition
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Taho AI API',
    version: '1.0.0',
    description: 'This API provides access to products and their management.',
  },
  servers: [
    {
      url: 'http://localhost:5000', // Replace with your production URL
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

/**
 * Options for swagger-jsdoc
 */
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API route files to auto-generate API documentation
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
