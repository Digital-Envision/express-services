import { Sequelize } from 'sequelize';
import env from '../utils/env';

export const sequelize = new Sequelize({
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  database: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  dialect: env.DB_DIALECT,
});
