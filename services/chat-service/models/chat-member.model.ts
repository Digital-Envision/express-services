import Sequelize, { CreationOptional, NonAttribute } from 'sequelize';
import BaseModel from './base-model';
import { sequelize } from '../sequelize/sequelize';
import type { Database } from '.';
import type Chat from './chat.model';
import { TABLE_NAME } from '../utils/constant';

// eslint-disable-next-line no-use-before-define
class ChatMember extends BaseModel<ChatMember> {
  declare chatMemberId: CreationOptional<string>;
  declare chatId: string;
  declare userId: string;
  // Can be 'admin' or 'member'
  //  Better to use an enum in here
  declare role: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare chat?: NonAttribute<Chat>;

  public static associate(db: Database) {
    ChatMember.belongsTo(db.Chat, {
      foreignKey: 'chatId',
      as: 'chat',
    });
  }
}

ChatMember.init(
  {
    chatMemberId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
    },
    chatId: {
      allowNull: false,
      references: {
        model: TABLE_NAME.CHAT,
        key: 'chatId',
      },
      onDelete: 'CASCADE',
      type: Sequelize.UUID,
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    tableName: TABLE_NAME.CHAT,
    paranoid: false,
  }
);

export default ChatMember;
