import asyncMw from "async-express-mw";
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { sendEmail } from "../utils/emails";
import ApiError from '../utils/apiError';
import User from "../models/user-model";
import UserAuth from "../models/user-auth-model";
import ResetToken from "../models/reset-token-model";

export const getUserByEmailMw = asyncMw(async (req, res, next) => {
  const auth: any = await UserAuth.findOne({where: { username: req.body.email }});
  if (!auth) throw new ApiError(404, 'User not found or not registered by email');
  const user: any = await User.findByPk(auth.userId);

  req.auth = auth;
  req.user = user;

  return next();
});

export const removeDuplicateTokenMw = asyncMw(async (req: any, res, next) => {
  // Remove all tokens that exists
  // By doing this, user can only have one reset token at a time
  await ResetToken.destroy({where: { authId: req.auth.id }});

  return next();
});

export const createResetTokenMw = asyncMw(async (req: any, res, next) => {
  const data = {
    token: uuid(),
    username: req.auth.username,
    authId: req.auth.id,
    expiresAt: moment().add(1, 'day').toDate(), // Expires in 24 hours
  };
  req.resetToken = await ResetToken.create(data);

  return next();
});

export const sendEmailMw = asyncMw(async (req: any, res) => {
  const { resetToken, auth, user } = req;

  const link = `${process.env.ADMIN_WEB_BASE_URL}/auth/reset-password/${resetToken.token}`;

  await sendEmail(
    auth.username,
    'Reset your password',
    { name: `${user.firstName} ${user.lastName}`, link },
    '../template/resetPassword.handlebars'
  );

  return res.status(200).json({ resetToken: resetToken.token });
});

export const verifyTokenMw = asyncMw(async (req, res, next) => {
  const token = await ResetToken.findOne({where: { token: req.params.token }});

  if (!token) return res.sendStatus(404);

  if (moment(token.expiresAt).isBefore(moment())) {
    await ResetToken.destroy({where: { id: token.id }});

    throw new ApiError(400, 'Token already expired');
  }

  req.resetToken = token;

  return next();
});

export const updateUserPasswordMw = asyncMw(async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    throw new ApiError(400, 'password and confirmPassword is not same');

  // const data = await repository.user.resourceToModel({ password });
  await UserAuth.update({ password }, {where: { id: req.resetToken.authId }});

  await ResetToken.destroy({where: { id: req.resetToken.id }});

  return res.sendStatus(200);
});