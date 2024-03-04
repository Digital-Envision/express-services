import { z } from 'zod';
import { Router } from 'express';
import Chat from '../../models/chat.model';
import deleteAction from './delete.chat';
import findAction from './find.chat';
// import messageAction from './[messageId].message';

const router = Router();

// ALL /chats/:chatId
//  we use this to auto validate the existence of the chat
router.use('/:chatId', async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const parseChatId = z.string().uuid().safeParse(chatId);

    if (!parseChatId.success) {
      return res.status(400).json({
        error: 'Invalid chat id',
      });
    }

    const chat = await Chat.findOne({
      where: {
        chatId,
      },
    });

    if (!chat) {
      return res.status(404).json({
        error: 'Chat not found',
      });
    }

    res.locals.chat = chat;

    return next();
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// GET /:chatId
router.use('/', findAction);

// DELETE /:chatId
router.use('/', deleteAction);

// POST /:chatId/messages
// router.use('/messages', messageAction);

export default router;
