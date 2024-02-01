import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost',
  username: 'root',
  password: '123',
  database: 'user_service',
});

export default sequelize;
