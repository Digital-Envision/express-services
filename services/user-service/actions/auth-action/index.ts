import express from "express";
import emailAction from "./email";
import facebookAction from "./facebook";

const router = express.Router();

router.use('/email', emailAction);
router.use('/facebook', facebookAction);

export default router;
