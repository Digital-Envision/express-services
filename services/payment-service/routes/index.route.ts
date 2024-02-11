import express from "express";
import PaymentRoute from './payment/index.route';

const router = express.Router();

router.use("/payment", PaymentRoute);

export default router;