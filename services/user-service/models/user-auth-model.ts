// User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import User from './user-model';

class UserAuth extends BaseModel<UserAuth> {
  declare id?: number;
  declare userId:  number;
  declare authType: number;
  declare username: string;
  declare password?: string | undefined;
  declare profileData?: string | undefined;
}

UserAuth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User.options.modelName,
        key: 'id',
      }
    },
    authType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileData: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserAuth',
    tableName: 'user_auths',
  }
);

export default UserAuth;
