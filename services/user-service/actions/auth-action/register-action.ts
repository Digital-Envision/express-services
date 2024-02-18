import express, {Request, Response} from "express";
import * as auth from '../../middleware/auth'

const router = express.Router();

/**
 * @swagger
 * /users/auth/register:
 *   post:
 *     summary: creates new user
 *     requestBody:
 *         name: userObject
 *         description: User's Object
 *         required: true
 *         content:
 *           application/json: 
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: John Doe Account
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@email.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: 123456
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *     responses:
 *       201:
 *         description: A successful response
 */
router.post('/', auth.createUserAuthMw);


export default router;