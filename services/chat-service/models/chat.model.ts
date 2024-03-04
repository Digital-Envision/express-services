import Sequelize, {
  CreationOptional,
  NonAttribute,
  FindAndCountOptions,
  InferAttributes,
  InferCreationAttributes,
  Attributes,
} from 'sequelize';
import BaseModel, { UnknownModel } from './base-model';
import { sequelize } from '../sequelize/sequelize';
import type { Database } from '.';
import type ChatMember from './chat-member.model';
import type ChatMessage from './chat-message.model';
import { ChatType, TABLE_NAME } from '../utils/constant';
import { Random } from '../types/helper';

// eslint-disable-next-line no-use-before-define
class Chat extends BaseModel<Chat> {
  declare chatId: CreationOptional<string>;
  declare avatar: string | null;
  declare name: string | null;
  declare description: string | null;
  // Can be 'private' or 'group'
  //  Better to use an enum in here
  declare type: ChatType;
  declare metadata: CreationOptional<Record<string, unknown>>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;

  declare members?: NonAttribute<ChatMember[]>;
  declare messages?: NonAttribute<ChatMessage[]>;

  public static associate(db: Database) {
    Chat.hasMany(db.ChatMember, {
      foreignKey: 'chatId',
      as: 'members',
    });

    Chat.hasMany(db.ChatMessage, {
      foreignKey: 'chatId',
      as: 'messages',
    });
  }

  public static findCountAll<U extends Chat>(
    options: FindAndCountOptions<Attributes<U>>,
    filterQueryParams?: Record<Random, Random>,
    query?: Record<Random, Random>
  ): Promise<{
    rows: BaseModel<
      UnknownModel,
      InferAttributes<UnknownModel, { omit: never }>,
      InferCreationAttributes<UnknownModel, { omit: never }>
    >[];
    count: number;
  }> {
    return super.findCountAll(options, filterQueryParams, query) as never;
  }
}

Chat.init(
  {
    chatId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
    },
    // Avatar for the chat
    //  NULL => Private chat
    avatar: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    // Name for the chat
    //  NULL => Private chat
    name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    // Description for the chat
    //  NULL => Private chat
    description: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    // Chat metadata
    //  Added for additional information
    metadata: {
      allowNull: false,
      defaultValue: {},
      type: Sequelize.JSONB,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    tableName: TABLE_NAME.CHAT,
    paranoid: false,
  }
);

export default Chat;
