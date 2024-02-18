// User.ts
import { DataTypes, Model, CreationOptional } from 'sequelize';
import sequelize from '../utils/sequelize';
import BaseModel from './base-model';

class ResetToken extends BaseModel<ResetToken> {
  declare id: CreationOptional<number>;
  declare authId: number;
  declare username: string;
  declare token: string;
  declare expiresAt: Date;
}

ResetToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
    token: {
			type: DataTypes.INTEGER,
			allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
			type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'ResetToken',
    tableName: 'reset_tokens',
  }
);

export default ResetToken;