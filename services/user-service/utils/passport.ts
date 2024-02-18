import passport from 'passport';
import LocalStrategy from 'passport-local';
// import MD5 from 'md5.js';
import User from '../models/user-model';
import UserAuth from '../models/user-auth-model';
import { compareText } from './encryption';
import ApiError from './apiError';
import { signAccessToken } from './token';

// export default {
//   localStrategy: new LocalStrategy.Strategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     }, 
//     async(email: string, password: string, done) => {
//       // const encryptedPassword = new MD5().update(password).digest('hex');
//       const userAuth = await UserAuth.findOne({ where: { username: email }, limit: 1 });
//       if (!userAuth) throw new ApiError(404, 'Incorrect email or password.');
      
//       try {
//         const isCorrect = await compareText(password, userAuth.password)
//         if (!isCorrect) throw new ApiError(404, 'Incorrect email or password.');
        
//         done(null, userAuth)
//       } catch (err) {

//       }
//     }
//   ),
//   initialize: (passport: passport.Authenticator) => {
//     passport.use(this?.localStrategy)
//   }
// }

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    }, 
    async(email: string, password: string, done) => {
      // const encryptedPassword = new MD5().update(password).digest('hex');
      console.log('🔥 get email', email)
      console.log('🔥 get password', password)
      const userAuth: any = await UserAuth.findOne({ where: { username: email }, limit: 1 });
      console.log('🔥 userAuth', userAuth)
      console.log('🔥 userAuth pass', userAuth.password)

      if (!userAuth) throw new ApiError(404, 'Incorrect email or password.');
      
      try {
        const isCorrect = await compareText(password, userAuth.password)
        if (!isCorrect) throw new ApiError(404, 'Incorrect email or password.');
        
        const tokenPayload = {
          id: userAuth.id,
          username: userAuth.username,
          authType: userAuth.authType
        }
        const token = await signAccessToken(tokenPayload)

        done(null, { token: token, username: userAuth.username }, { message: 'login successfull'})
      } catch (err) {
        console.log('❌ err', err)
        done(err)
      }
    }
  )
)

passport.serializeUser((user: any, done: any) => {
  console.log('🔥 passport serializeUser', user)
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  console.log('🔥 passport deserializeUser', user)
  done(null, user);
});

export default passport;