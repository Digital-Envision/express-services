// User.ts
import { DataTypes, Model, CreationOptional } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import { hashText } from '../utils/encryption';

class User extends BaseModel<User> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare authType: number;
  declare username: string;
  declare password: string;
  declare profileData: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
    authType: {
			type: DataTypes.INTEGER,
			allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileData: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserAuth',
    tableName: 'user_auths',
    hooks: {
      beforeCreate: async (user, options) => {
        // hash password here
        throw { errmsg: 'ini error' };
        const encryptedPassword = await hashText(user.password);
        user.password = encryptedPassword;
      },
      beforeUpdate: async (user, options) => {
        if (user.password) {
          const encryptedPassword = await hashText(user.password);
          user.password = encryptedPassword;
        }
      }
    }
  }
);

export default User;