import express from "express";
import { PaymentHandler } from "../../handler/payment/payment.handler";
import { PaymentCreatePayload } from "../../types/payment.interface";

const router = express.Router();
const paymentHandler = new PaymentHandler();

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments.
 *     consumes:
 *       - application/json
 *     description: Retrieve a list of all payments.
 *     responses:
 *       200:
 *         description: A list of payments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payments:
 *                   type: array
 *     tags:
 *       - Payments
 */
router.get("/", async (req, res) => {
    try {
        const payments = await paymentHandler.getPayments();
        res.json({ payments });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Get a payment by ID.
 *     description: Retrieve a payment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested payment.
 *         content:
 *           application/json
 *       404:
 *         description: Payment not found.
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - Payments
 */
router.get("/:id", async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await paymentHandler.getPayment(paymentId);
        res.json(payment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a new payment.
 *     description: Create a new payment with the provided payload.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentCreatePayload'
 *     responses:
 *       200:
 *         description: The created payment.
 *         content:
 *           application/json
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - Payments
 */
router.post("/", async (req, res) => {
    try {
        const paymentPayload: PaymentCreatePayload = req.body;
        const createdPayment = await paymentHandler.createPayment(paymentPayload);
        res.json(createdPayment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /payment/{id}/void:
 *   post:
 *     summary: Void a payment.
 *     description: Void a payment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment to void.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The payment was successfully voided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       404:
 *         description: Payment not found.
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - Payments
 */
router.post("/:id/void", async (req, res) => {
    try {
        const paymentId = req.params.id;
        await paymentHandler.voidPayment(paymentId);
        res.json({ message: "Payment voided successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;