import express, {Request, Response} from "express";
import User from "../../models/user-model";

const router = express.Router();

/**
 * @swagger
 * /users/auth/login:
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
router.post("/", async(req: Request, res: Response) => {
  console.log('post');

  const user = await User.findOne();
  res.status(200).json(user);
});

export default router;