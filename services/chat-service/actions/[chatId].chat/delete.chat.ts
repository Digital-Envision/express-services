import { Router } from 'express';
import Chat from '../../models/chat.model';
import { CHAT_TYPE } from '../../utils/constant';

const router = Router();

// DELETE /chats/:chatId
// Add validation who has the access to delete the chat in the future
//  e.g. only admin|moderator role can delete the chat
router.delete('/:chatId', async (req, res) => {
  try {
    const chat = res.locals.chat as Chat;

    if (chat.type === CHAT_TYPE.PRIVATE) {
      return res.status(400).json({
        error: 'Private chat cannot be deleted',
      });
    }

    await chat.destroy();

    return res.status(204).json(null);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

export default router;
