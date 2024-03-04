import { Router } from 'express';
import Chat from '../models/chat.model';

const router = Router();

// GET /chats
//  Please add the conditions later on
router.get('/', async (req, res) => {
  try {
    const { query } = req;

    const limit = +(query.limit === 'all' ? 0 : query.limit || 10);
    const page =
      query.page && !Number.isNaN(+query.page) && +query.page > 0
        ? +query.page
        : 1;
    const offset = page > 0 ? limit * (page - 1) : 0;

    const where: Record<string, unknown> = {};

    if (query.type) {
      where.type = query.type;
    }

    const chats = await Chat.findCountAll({
      where,
      limit: limit === 0 ? undefined : limit,
      offset,
    });

    const nextUrl = new URL(req.url);
    nextUrl.searchParams.set('page', `${page + 1}`);
    nextUrl.searchParams.set('limit', `${limit}`);

    const prevUrl = new URL(req.url);
    prevUrl.searchParams.set('page', `${page - 1}`);
    prevUrl.searchParams.set('limit', `${limit}`);

    const totalPage = Math.ceil(chats.count / limit);
    const withNext = page < totalPage;
    const withPrev = page > 1;

    return res.status(200).json({
      data: chats.rows,
      page: {
        size: chats.count,
        current: page,
        totalPage,
        ...(withNext
          ? {
              next: nextUrl.href,
            }
          : {}),
        ...(withPrev
          ? {
              prev: prevUrl.href,
            }
          : {}),
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

export default router;
