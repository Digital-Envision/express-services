import express from "express";
import PaymentRoute from './payment/index.action';

const router = express.Router();

router.use("/payment", PaymentRoute);

export default router;