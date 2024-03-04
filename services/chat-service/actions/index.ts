import { Router } from 'express';
import createAction from './create.chat';
import listAction from './list.chat';
import specificAciton from './[chatId].chat';

const router = Router();

// Uncomment this and add the validations in here
//  e.g. auth, validations, etc.
// router.use('*', ...);

router.use('/', createAction);
router.use('/', listAction);
router.use('/', specificAciton);

export default router;
