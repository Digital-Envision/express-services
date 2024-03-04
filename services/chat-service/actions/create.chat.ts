import { Router } from 'express';
import Chat from '../models/chat.model';
import { CHAT_TYPE } from '../utils/constant';
import ChatMember from '../models/chat-member.model';
import { createChatSchema } from '../schemas';

const router = Router();

// POST /chats
router.post('/', async (req, res) => {
  try {
    const body = createChatSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({
        error: 'Invalid request body',
      });
    }

    const payload = body.data;

    // Check if the previous private chat exists
    if (payload.type === CHAT_TYPE.PRIVATE && payload.members.length === 2) {
      const chat = await Chat.findOne({
        where: {
          type: CHAT_TYPE.PRIVATE,
        },
        include: {
          model: ChatMember,
          where: {
            userId: [body.data.members[0].userId, body.data.members[1].userId],
          },
          required: true,
        },
      });

      if (chat) {
        return res.status(200).json({
          data: chat,
        });
      }
    }

    // Else, create the chat and return
    const chat = await Chat.create(payload);

    return res.status(200).json({
      data: chat,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

export default router;
