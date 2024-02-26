import { EmailHandler } from './../../handler/email.handler';
import express, { Request, Response } from "express";
import multer from "multer";

const router = express.Router();
router.use(express.json());

// Set up multer for handling file uploads
const upload = multer({ dest: "uploads/" });

const emailHandler = new EmailHandler();

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send an email
 *     tags:
 *       - Email
 *     requestBody:
 *       content:
 *         multipart/form-data:
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
 *               attachment:
 *                 type: string
 *                 format: binary
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
router.post('/send', upload.single("attachment"), async (req: Request, res: Response) => {
    try {
        const { emailTo, subject, emailBody, provider } = req.body;
        const attachment = req.file; // Retrieve the uploaded file

        if (!emailTo) {
            res.status(400).json({
                message: 'Email destination is required'
            });
            return;
        }

        await emailHandler.sendEmail(provider, emailTo, subject, emailBody, attachment);

        res.status(200).json({
            message: 'Email sent successfully'
        });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
})

export default router;