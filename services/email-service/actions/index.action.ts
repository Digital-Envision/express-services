import express from "express";
import EmailRoute from './email/index.action';

const router = express.Router();

router.use("/", EmailRoute);

export default router;