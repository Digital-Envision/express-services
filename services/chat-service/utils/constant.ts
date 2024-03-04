import type { ConstantToPascalCase } from '../types/helper';

export const TABLE_NAME = {
  CHAT_MEMBER: 'chat-members',
  CHAT: 'chats',
  CHAT_MESSAGE: 'chat-messages',
} as const;

export type TableName = ConstantToPascalCase<keyof typeof TABLE_NAME>;

export const CHAT_ROLE = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

export type ChatRole =
  | (typeof CHAT_ROLE)[keyof typeof CHAT_ROLE]
  | (NonNullable<unknown> & string);

export const CHAT_TYPE = {
  PRIVATE: 'private',
  GROUP: 'group',
} as const;

export type ChatType =
  | (typeof CHAT_TYPE)[keyof typeof CHAT_TYPE]
  | (NonNullable<unknown> & string);
