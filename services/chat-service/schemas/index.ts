import { z } from 'zod';
import { CHAT_ROLE, CHAT_TYPE } from '../utils/constant';
import { isNil, isPlainObject } from '../utils/common';

export const baseChatSchema = z.object({
  avatar: z.string().nullable().optional().default(null),
  name: z.string().nullable().optional().default(null),
  description: z.string().nullable().optional().default(null),
  type: z.enum([CHAT_TYPE.GROUP, CHAT_TYPE.PRIVATE]),
  metadata: z
    .any()
    .default({})
    .transform((value, ctx) => {
      if (isNil(value)) return {};

      try {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const metadata = typeof value === 'string' ? JSON.parse(value) : value;

        if (Array.isArray(metadata) || !isPlainObject(metadata)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Metadata must be an object',
          });

          return {};
        }

        return metadata;
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Metadata must be an object',
        });

        return {};
      }
    }),
});

export const chatMemberSchema = z.object({
  chatId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum([CHAT_ROLE.ADMIN, CHAT_ROLE.MODERATOR, CHAT_ROLE.MODERATOR]),
});

export const createChatSchema = baseChatSchema
  .extend({
    members: chatMemberSchema
      .omit({
        chatId: true,
      })
      .array(),
  })
  .superRefine((value, ctx) => {
    // Remove unnecessary fields
    if (value.type === CHAT_TYPE.PRIVATE) {
      /* eslint-disable no-param-reassign */
      value.avatar = null;
      value.description = null;
      value.name = null;
      /* eslint-enable no-param-reassign */
      return;
    }

    if (!value.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Name is required',
      });
    }
  });
