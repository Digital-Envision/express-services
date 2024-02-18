import express from "express";
import UploadRoute from './upload/index.action';

const router = express.Router();

router.use("/", UploadRoute);

export default router;