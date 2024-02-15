import { Request, Response } from "express";
import asyncMw from 'async-express-mw';
import * as yup from 'yup';
import User from "../models/user-model";
import UserAuth from "../models/user-auth-model";
import ApiError from '../utils/apiError';
import { compareText } from "../utils/encryption";
import { signAccessToken } from "../utils/token";
import _ from "lodash";


export const authMw = asyncMw(async (req, res, next) => {

})

export const createUserAuthMw = asyncMw(async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      firstName: yup.string(),
      lastName: yup.string(),
      username: yup.string(),
      password: yup.string().required(),
      email: yup.string().email()
    });
    await schema.validate(req.body);

    if (!req.body.username && !req.body.email)
      throw new ApiError(422, 'email or username required');

    const userName = req?.body?.username || req?.body?.email
    const [user, userAuth] = await Promise.all([
      User.findOne({ where: { firstName: req?.body?.firstName, lastName: req?.body?.lastName }, limit: 1}),
      UserAuth.findOne({ where: { username: userName }, limit: 1})
    ])
    if (userAuth) throw new ApiError(400, 'email already in use');

    //👉 create data in db
    const userCreate: any = await User.create({ firstName: req.body.firstName, lastName: req.body.lastName })
    req.user = userCreate
    const authCreate: any = await UserAuth.create({
      userId: userCreate.id,
      authType: 1,
      username: userName,
      password: req.body.password,
      profileData: userCreate
    })
    req.auth = authCreate
    
    return res.sendStatus(201);
  } catch (err: any) {
    if (req.user) {
      // 👉 handler for if user is created but auth is failed
      const user: any = req.user
      await User.destroy({where: { id: user.id }})
    }
    return next(new ApiError(err.statusCode ?? err.status ?? 400, err.message));
  }
})

export const loginMw = asyncMw(async (req, res) => {
  const user: any = await UserAuth.findOne({where: { username: req.body.email }});
  if (!user) throw new ApiError(404, 'User not found');

  if (!user.password) throw new ApiError(400, 'Invalid email or password');
  if (!(await compareText(req.body.password, user.password)))
    throw new ApiError(401, 'Unauthorized');

  const token = signAccessToken(_.pick(user, ['id', 'username']), req.body.isAlways);

  return res.json({ id: user.id, token });
});
