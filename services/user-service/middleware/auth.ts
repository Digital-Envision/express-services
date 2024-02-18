import { Request, Response } from "express";
import asyncMw from 'async-express-mw';
import * as yup from 'yup';
import User from "../models/user-model";
import UserAuth from "../models/user-auth-model";
import ApiError from '../utils/apiError';
import { compareText } from "../utils/encryption";
import { signAccessToken, verifyAccessToken } from "../utils/token";
import _ from "lodash";
import { UserAuthTypeEnum } from "../utils/enums";
import { IUser, IUserAuth } from "../utils/types";

export const authMw = asyncMw(async (req, res, next) => {
  if (!req.headers.authorization) throw new ApiError(401, 'Unauthorized 1');

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.split(' ')[1];

  const isVerifiedToken = await verifyAccessToken(bearerToken);
  if (!isVerifiedToken) throw new ApiError(401, 'Unauthorized 2');

  req.userAuth = await UserAuth.findByPk(isVerifiedToken.id);
  if (!req.userAuth) throw new ApiError(404, 'User not found');

  return next();
});

export const createUserAuthMw = asyncMw(async (req, res, next) => {
  try {
    console.log('🔥 body', req.body)
    const schema = yup.object().shape({
      firstName: yup.string(),
      lastName: yup.string(),
      username: yup.string(),
      password: yup.string().required(),
      email: yup.string().email().required()
    });
    await schema.validate(req.body);

    const userAuth = await UserAuth.findOne({ where: { email: req.body.email }, limit: 1})
    if (userAuth) throw new ApiError(400, 'email already in use');

    //👉 create data in db
    const userPayload = _.pick(req.body, ['firstName', 'lastName', 'email'])
    const userCreate: IUser = await User.create(userPayload)
    req.user = userCreate

    const authPayload = _.pick(req.body, ['username', 'email', 'password'])
    const authCreate: IUserAuth = await UserAuth.create({
      userId: userCreate.id,
      authType: UserAuthTypeEnum.Email,
      profileData: userCreate,
      ...authPayload
    })
    req.auth = authCreate
    
    return res.sendStatus(201);
  } catch (err: any) {
    if (req.user) {
      const user: any = req.user
      if (user) await User.destroy({where: { id: user.id }})

    }
    return next(new ApiError(err.statusCode ?? err.status ?? 400, err.message));
  }
})

export const loginMw = asyncMw(async (req, res, next) => {
  try {
    console.log('🔥` email', req.body.email)
    const auth: IUserAuth | null = await UserAuth.findOne({where: { email: req.body.email }});
    if (!auth) throw new ApiError(404, 'User not found');
    console.log('🔥` auth', auth)

    if (!auth.password) throw new ApiError(400, 'Invalid email or password');
    if (!(await compareText(req.body.password, auth.password)))
      throw new ApiError(401, 'Unauthorized');

    const token = signAccessToken(_.pick(auth, ['id', 'username']), req.body.isAlways);

    return res.json({ token });
  } catch (err: any) {
    console.log('🔥` err', err)
    return next(new ApiError(err.statusCode ?? err.status ?? 400, err.message));
  }
});

export const updateUserMw = asyncMw(async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      firstName: yup.string(),
      lastName: yup.string(),
      username: yup.string(),
      email: yup.string().email(),
      password: yup.string(),
      oldPassword: yup.string(),
      confirmPassword: yup.string(),
    });
    await schema.validate(req.body);

    const auth = await UserAuth.findOne({where: { id: req.params.authId }})
    if (!auth) throw new ApiError(404, 'User not found');

    if (req.body.password) {
      if (!req.body.oldPassword) throw new ApiError(422, 'oldPassword required');
      const isMatch = await compareText(req.body.oldPassword, req.userAuth.password);
      if (!isMatch) throw new ApiError(400, 'Old password is incorrect');
      if (req.body.password !== req.body.confirmPassword)
        throw new ApiError(400, 'New Password and Confirm New Password must be match');
    }

    const authPayload = _.pick(req.body, ['password', 'username', 'email'])
    const userPayload = _.pick(req.body, ['firstname', 'lastName', 'email'])

    const [] = await Promise.all([
      UserAuth.update(authPayload, {where: { id: auth.id }, individualHooks: true}),
      User.update(userPayload, {where: { id: auth.userId }})
    ])

    const [authUpdate, userUpdate] = await Promise.all([
      UserAuth.findOne({where: { id: auth.id }}),
      User.findOne({where: { id: auth.userId }})
    ])
    const authRes = _.pick(authUpdate, ['username', 'email'])
    const userRes = _.pick(userUpdate, ['firstName', 'lastName'])

    return res.status(200).json({ ...authRes, ...userRes });
  } catch (err: any) {
    return next(new ApiError(err.statusCode ?? err.status ?? 400, err.message));
  }
})

export const deleteMw = asyncMw(async (req, res, next) => {
  try {
    const auth = await UserAuth.findOne({where: { id: req.params.authId }})
    if (!auth) throw new ApiError(404, 'User not found');

    await Promise.all([
      await UserAuth.destroy({where: { id: auth.id }}),
      await User.destroy({where: { id: auth.userId }})
    ])
    return res.sendStatus(204);
  } catch (err: any) {
    return next(new ApiError(err.statusCode ?? err.status ?? 400, err.message));
  }
})
