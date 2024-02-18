import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userService from './services/user-service';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const swwaggerSpecOption: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript Swagger',
      version: '1.0.0',
      description: 'API documentation for Express TypeScript',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: []
};

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'sesion secret',
  })
);
app.use(userService.initialize({ swaggerSpecOption: swwaggerSpecOption }));

const swaggerSpec = swaggerJSDoc(swwaggerSpecOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
