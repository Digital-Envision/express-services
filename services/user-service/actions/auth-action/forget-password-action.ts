import express, {Request, Response} from "express";
import * as reset from '../../middleware/reset'

const router = express.Router();

/**
 * @swagger
 * /users/auth/forgot-password:
 *   post:
 *     summary: forgot password
 *     requestBody:
 *         name: userObject
 *         description: User's Object
 *         required: true
 *         content:
 *           application/json: 
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@email.com
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: object
 *           properties:
 *             resetToken:
 *               type: string
 *               format: jwt
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwia
 */

router.post(
  "/",
  reset.getUserByEmailMw,
  reset.removeDuplicateTokenMw,
  reset.createResetTokenMw,
  reset.sendEmailMw
);

export default router;