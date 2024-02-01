import express from "express";
import authAction from "./auth-action";

const router = express.Router();
router.use("/auth", authAction);


export default router;
