import express, {Request, Response} from "express";
import * as reset from '../../middleware/reset'

const router = express.Router();

/**
 * @swagger
 * /users/auth/reset-password:
 *   post:
 *     summary: reset password
 *   parameters:
*      - in: path
*        name: token
*        type: string
*        required: true
*         description: reset-token from forget-password.
 *     requestBody:
 *         name: userObject
 *         description: User's Object
 *         required: true
 *         content:
 *           application/json: 
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: 123456
 *                 confirmPassword:
 *                   type: string
 *                   format: password
 *                   example: 123456
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: object
 *           properties:
 */

router.post(
  "/:token",
  reset.verifyTokenMw,
  reset.updateUserPasswordMw
);

export default router;