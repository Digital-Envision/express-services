import { EmailHandler } from './../../handler/email.handler';
import express, { Request, Response } from "express";

const router = express.Router();
router.use(express.json());

const emailHandler = new EmailHandler();

/**
 * @swagger
 * /api/email:
 *   post:
 *     summary: Send an email
 *     tags:
 *       - Email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailTo:
 *                 type: string
 *               subject:
 *                 type: string
 *               emailBody:
 *                 type: string
 *               provider:
 *                 type: string
 *             required:
 *               - emailTo
 *               - subject
 *               - emailBody
 *               - provider
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Email destination is required
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { emailTo, subject, emailBody, provider } = req.body;

        if (!emailTo) {
            res.status(400).json({
                message: 'Email destination is required'
            });
        }

        await emailHandler.sendEmail(provider, emailTo, subject, emailBody);

        res.status(200).json({
            message: 'Email sent successfully'
        });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
})

export default router;