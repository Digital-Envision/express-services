import passport from 'passport';
import LocalStrategy from 'passport-local';
import FacebookStrategy from "passport-facebook";
import { UserAuthTypeEnum } from '../utils/enum';
import User from '../models/user-model';
import UserAuth from '../models/user-auth-model';
import sequelize from './sequelize';
import { Transaction } from 'sequelize';

const strategy = {
  login: async (profileId: string, authType: UserAuthTypeEnum, options: {
    user: {
      firstName: string,
      lastName?: string | null | undefined,
      email: string,
      imageUrl?: string | null | undefined,
      auth: {
        profileId: string,
        accessToken?: string | undefined, 
        refreshToken?: string| undefined,
        data?: object | undefined,
      }
    }
  }) => {
    const userAuth = await UserAuth.findOne({
      where: {
        authType: authType,
        username: profileId,
      },
    });

    const userToViewModel = (user: User) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    }

    if(userAuth) {
      const user = await User.findOne({
        where: {
          id: userAuth.userId,
        }
      });

      if(user == null) {
        throw new Error('User not found');
      };

      return userToViewModel(user);
    } else {
      await sequelize.transaction(async (t: Transaction) => {
        const user = await User.create({
          firstName: options.user.firstName,
          lastName: options.user.lastName,
        }, {transaction: t});
  
        await UserAuth.create({
          userId: user.id || 0,
          authType: authType,
          username: options.user.auth.profileId,
          profileData: options.user.auth.data ? JSON.stringify(options.user.auth.data) : undefined,
        }, {transaction: t});

        return userToViewModel(user);
      });
    }
  },

  localStrategy: new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    }, 
    async(email: string, password: string, done) => {

    }
  ),

  facebookStrategy: new FacebookStrategy.Strategy({
    clientID: process.env.USER_SERVICE_FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.USER_SERVICE_FACEBOOK_CLIENT_SECRET as string,
    callbackURL: `${process.env.API_URL}/users/auth/facebook/redirect`,
    profileFields: ['id', 'displayName', 'name', 'email', 'photos'],
    enableProof: true
  }, async (accessToken: string, refreshToken: string, profile: FacebookStrategy.Profile, callback) => {
    try {
      if(!profile.emails || profile.emails.length == 0) {
        throw new Error('No email found, please check app scope configuration');
      }

      const user = await strategy.login(profile.id, UserAuthTypeEnum.Facebook, {
        user: {
          firstName: profile.displayName,
          email: profile.emails[0].value,
          imageUrl: profile.photos?.length && profile.photos?.length > 0 ? profile.photos[0].value : null,
          auth: {
            profileId: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            data: profile
          }
        }
      });

      callback(null, user);
    } catch(error: any) {
      callback(error, null);
    }
  }),

  initialize: (passport: passport.Authenticator) => {
    if(process.env.USER_SERVICE_LOCAL_ENABLE_AUTH) {
      passport.use(strategy.localStrategy);
    }

    if(process.env.USER_SERVICE_FACEBOOK_ENABLE_AUTH == 'true') {
      passport.use(strategy.facebookStrategy);
    }
    
    passport.serializeUser((user: any, done) => done(null, user));
    passport.deserializeUser((user: any, done) => done(null, user));
  }
}

export default strategy;
