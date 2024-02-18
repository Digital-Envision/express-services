import express from "express";
import loginAction from "./login-action";
import registerAction from "./register-action";
import userPatchAction from "./user-patch-action";
import userDeleteAction from "./user-delete-action";
import forgotPasswordAction from "./forget-password-action"
import resetPasswordAction from "./reset-password-action"


const router = express.Router();

router.use("/login", loginAction);
router.use("/register", registerAction);
router.use("/forgot-password", forgotPasswordAction);
router.use("/reset-password", resetPasswordAction);
router.use("/user", userPatchAction);
router.use("/user", userDeleteAction);

export default router;