// User.ts
import { DataTypes, Model, CreationOptional } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';

class User extends BaseModel<User> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: CreationOptional<string>;
  declare email: string;
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        }
      }
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
