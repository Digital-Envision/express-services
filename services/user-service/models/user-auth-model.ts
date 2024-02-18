import { DataTypes, Model, CreationOptional } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';
import { hashText } from '../utils/encryption';

class User extends BaseModel<User> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare authType: number;
  declare username: string;
  declare email: string;
  declare password: CreationOptional<string>;
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
    password: {
      type: DataTypes.STRING,
      allowNull: true,
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
        const encryptedPassword = await hashText(user.password);
        user.password = encryptedPassword;
      },
      beforeUpdate: async (user, options) => {
        if (user.password) {
          const encryptedPassword = await hashText(user.password);
          user.password = encryptedPassword;
        }
      },
    }
  }
);

export default User;