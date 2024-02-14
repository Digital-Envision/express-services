import express, { Request, Response } from 'express';
import multer from 'multer';
import { UploadHandler } from '../../handler/upload.handler';

const router = express.Router();
const uploadHandler = new UploadHandler();

// Multer configuration
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file based on provider.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The file to upload.
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bucket:
 *                   type: string
 *                 key:
 *                   type: string
 *                 location:
 *                   type: string
 *     tags:
 *       - Upload Service
 */
router.post('/', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const { bucket } = req.body;

        if (!req.file) {
            res.status(400).json({ error: 'File not found' });
            return;
        }

        const file = req.file;
        const fileKey = file.originalname;

        const uploadedFile = await uploadHandler.uploadFile(bucket, fileKey, file.buffer, 'aws');
        res.json(uploadedFile);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /upload/remove-file:
 *   delete:
 *     summary: Remove a file from AWS S3.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: fileKey
 *         type: string
 *         required: true
 *         description: The key or path of the file to remove.
 *     responses:
 *       200:
 *         description: File removed successfully.
 *       400:
 *         description: Invalid request body.
 *     tags:
 *       - Upload Service
 */
router.delete('/remove-file', async (req: Request, res: Response) => {
    try {
        const { fileKey, bucket, provider } = req.body;

        if (!fileKey) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }

        await uploadHandler.removeFile(bucket, fileKey, provider);
        res.sendStatus(200);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;