import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userService from './services/user-service';
import { JSDoc } from 'typescript';

const app = express();
const port = 3000;



const swwaggerSpecOption: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript Swagger',
      version: '1.0.0',
      description: 'API documentation for Express TypeScript',
    },
  },
  apis: []
};

app.use(userService.initialize({
  database: {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123",
    database: "user_service",
    dialect: "mysql",
  },
  swaggerSpecOption: swwaggerSpecOption
}));

const swaggerSpec = swaggerJSDoc(swwaggerSpecOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
