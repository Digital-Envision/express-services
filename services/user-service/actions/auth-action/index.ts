import express from "express";
import loginAction from "./login-action";
import registerAction from "./register-action";



const router = express.Router();

router.use("/login", loginAction);
router.use("/register", registerAction);

export default router;