import Sequelize, { CreationOptional, NonAttribute } from 'sequelize';
import BaseModel from './base-model';
import { sequelize } from '../sequelize/sequelize';
import type { Database } from '.';
import type Chat from './chat.model';
import { TABLE_NAME } from '../utils/constant';

// eslint-disable-next-line no-use-before-define
class ChatMessage extends BaseModel<ChatMessage> {
  declare chatMessageId: CreationOptional<string>;
  declare chatId: string;
  declare userId: string;
  // Optional, since user can sent message without a text | attachments | etc.
  declare content: CreationOptional<string>;
  // Contains any attachment like data
  declare attachments: CreationOptional<Record<string, unknown>>;
  // Custom data for the messages
  declare metadata: CreationOptional<Record<string, unknown>>;
  // Indicator for the message, e.g. 'cards' | 'contact'
  declare type: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare chat?: NonAttribute<Chat>;

  public static associate(db: Database) {
    ChatMessage.belongsTo(db.Chat, {
      foreignKey: 'chatId',
      as: 'chat',
    });
  }
}

ChatMessage.init(
  {
    chatMessageId: {
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
    content: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    attachments: {
      allowNull: true,
      defaultValue: {},
      type: Sequelize.JSONB,
    },
    metadata: {
      allowNull: false,
      defaultValue: {},
      type: Sequelize.JSONB,
    },
    type: {
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
    tableName: TABLE_NAME.CHAT_MESSAGE,
    paranoid: false,
  }
);

export default ChatMessage;
