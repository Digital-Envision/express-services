import express, {Request, Response} from "express";
import * as auth from '../../middleware/auth'

const router = express.Router();

/**
 * @swagger
 * /users/auth/register:
 *   post:
 *     summary: User login
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: userCredentials
 *         description: User's login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: user@email.com
 *             password:
 *               type: string
 *               format: password
 *               example: 123456
 *             firstName:
 *               type: string
 *               example: John
 *             lastName:
 *               type: string
 *               example: Doe
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
router.post('/', auth.createUserAuthMw);


export default router;