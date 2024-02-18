import express, {Request, Response} from "express";
import User from "../../models/user-model";
import { loginMw } from "../../middleware/auth";
import passport from "passport";

const router = express.Router();

/**
 * @swagger
 * /users/auth/login:
 *   post:
 *     summary: User login
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
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: 123456
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

router.post("/", loginMw)

export default router;