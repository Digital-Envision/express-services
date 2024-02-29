import type { ConstantToPascalCase } from '../types/helper';

export const TABLE_NAME = {
  CHAT_MEMBER: 'chat-members',
  CHAT: 'chats',
  CHAT_MESSAGE: 'chat-messages',
} as const;

export type TableName = ConstantToPascalCase<keyof typeof TABLE_NAME>;
