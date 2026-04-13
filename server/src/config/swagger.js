import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JS-Practice-Hub API',
      version: '1.0.0',
      description: 'API JS-Practice-Hub',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
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
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
          },
        },
        QuestionStat: {
          type: 'object',
          properties: {
            questionId: { type: 'string' },
            successCount: { type: 'number' },
            failedCount: { type: 'number' },
          },
        },
        LessonProgress: {
          type: 'object',
          properties: {
            successAttempt: { type: 'number' },
            failedAttempt: { type: 'number' },
            questions: {
              type: 'array',
              items: { $ref: '#/components/schemas/QuestionStat' },
            },
          },
        },
        Progress: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            lessons: {
              type: 'object',
              additionalProperties: { $ref: '#/components/schemas/LessonProgress' },
            },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

export const specs = swaggerJsdoc(options);
