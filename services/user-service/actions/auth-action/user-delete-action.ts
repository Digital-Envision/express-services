import express, {Request, Response} from "express";
import * as auth from '../../middleware/auth'

const router = express.Router();

/**
 * @swagger
 * /users/auth/user/{authId}:
 *   delete:
 *     summary: User delete
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authId
 *         type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: A successful response
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               format: jwt
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwia
 */
router.delete('/:authId', auth.authMw, auth.deleteMw);


export default router;