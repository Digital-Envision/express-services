import passport from 'passport';
import LocalStrategy from 'passport-local';
import MD5 from 'md5.js';
import User from '../models/user-model';

export default {
  localStrategy: new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    }, 
    async(email: string, password: string, done) => {
      const encryptedPassword = new MD5().update(password).digest('hex');
      //const user = await User.findOne({  });
      
    }
  ),
  initialize: (passport: passport.Authenticator) => {

  }
}