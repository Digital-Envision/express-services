import express, {Request, Response} from "express";
import passport from "passport";
import { signAccessToken } from "../../../utils/token";

const router = express.Router();

router.get("/",  
  passport.authenticate('facebook', { failureRedirect: '/', failureMessage: true }), 
  (req, res) => {
    const token = signAccessToken({id: (req.user as any).id});
    let redirectUrl = process.env.USER_SERVICE_FACEBOOK_REDIRECTION_URL as string;
    redirectUrl = `${redirectUrl}/${(req.user as any).id}/${token}`; 
    res.redirect(redirectUrl);
  });

export default router;
