import { Router } from 'express';
import Chat from '../../models/chat.model';

const router = Router();

// GET /chats/:chatId
// Please add the conditions later on
//  e.g. only the member of the chat can see the chat
router.get('/:chatId', async (req, res) => {
  const chat = res.locals.chat as Chat;

  return res.status(200).json({
    data: chat,
  });
});

export default router;
