import express from "express";
import { PaymentActions } from "../../actions/payment/payment.action";

const router = express.Router();
const paymentActions = new PaymentActions();

router.get("/:id", async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await paymentActions.getPayment(paymentId);
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const paymentPayload = req.body;
        const createdPayment = await paymentActions.createPayment(paymentPayload);
        res.json(createdPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:id/void", async (req, res) => {
    try {
        const paymentId = req.params.id;
        await paymentActions.voidPayment(paymentId);
        res.json({ message: "Payment voided successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;