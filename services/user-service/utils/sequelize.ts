import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.USER_SERVICE_DB_DIALECT as any, 
  host: process.env.USER_SERVICE_DB_HOST as any,
  port: process.env.USER_SERVICE_DB_PORT as any,
  username: process.env.USER_SERVICE_DB_USERNAME as any,
  password: process.env.USER_SERVICE_DB_PASSWORD as any,
  database: process.env.USER_SERVICE_DB_DATABASE as any,
});

export default sequelize;

