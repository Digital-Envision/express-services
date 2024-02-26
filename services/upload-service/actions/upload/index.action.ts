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
        const { provider } = req.body;

        if (!req.file) {
            res.status(400).json({ error: 'File not found' });
            return;
        }

        const file = req.file;
        const fileKey = file.originalname;

        const uploadedFile = await uploadHandler.uploadFile(fileKey, file.buffer, provider);
        res.json(uploadedFile);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /bulk:
 *   post:
 *     summary: Upload files in bulk
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               provider:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uploadResults:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Define your upload result properties here
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/bulk', upload.array('files'), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            // Handle the case when no files are uploaded
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const files = req.files;
        const provider = req.body.provider; // Assuming the provider is sent in the request body

        if (!Array.isArray(files)) {
            return res.status(400).json({ error: 'Invalid files array' });
        }

        const uploadPromises = files.map(async (file) => {
            const fileKey = file.originalname;
            const fileBuffer = file.buffer;

            return uploadHandler.uploadFile(fileKey, fileBuffer, provider);
        });

        const uploadResults = await Promise.all(uploadPromises);

        res.json({ uploadResults });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Failed to upload files' });
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
router.delete('/remove', async (req: Request, res: Response) => {
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