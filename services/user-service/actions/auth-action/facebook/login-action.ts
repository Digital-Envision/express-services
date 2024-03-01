import express, {Request, Response} from "express";
import passport from "passport";

const router = express.Router();

/**
 * @swagger
 * /users/auth/facebook/login:
 *   get:
 *     description: Facebook authentication. To test this functionality, please open the URL in the browser. Testing using swagger doesn't work
 *     summary: Facebook login
 *     responses:
 *       200:
 *         description: A redire
 */
router.get("/", passport.authenticate("facebook", { scope: [ 'email' ] }));

export default router;
