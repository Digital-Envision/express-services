// User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';

class User extends BaseModel<User> {
  declare id?: number;
  declare firstName: string;
  declare lastName?: string | null | undefined;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
