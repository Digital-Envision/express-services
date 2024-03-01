import express from "express";
import loginAction from "./login-action";
import redirectAction from "./redirect-action";


const router = express.Router();

router.use("/login", loginAction);
router.use("/redirect", redirectAction);

export default router;
