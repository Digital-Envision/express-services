import express, {Request, Response} from "express";
import * as auth from '../../middleware/auth'

const router = express.Router();

/**
 * @swagger
 * /users/auth/user/{authId}:
 *   patch:
 *     summary: User edit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authId
 *         type: integer
 *         required: true
 *     requestBody:
 *       name: userObject
 *       description: User's Object
 *       required: true
 *       content:
 *         application/json: 
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               username:
 *                 type: string
 *                 example: John Doe Account
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@email.com
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 1234567
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: 1234567
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               format: jwt
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwia
 */
router.patch('/:authId', auth.authMw, auth.updateUserMw);


export default router;