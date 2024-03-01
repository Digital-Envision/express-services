import express from 'express';
import { Sequelize, Options } from 'sequelize';
import session from 'express-session';
import passport from 'passport';
import action from "./actions";
import swaggerJSDoc from 'swagger-jsdoc';
import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from './utils/sequelize';
import passportUtil from './utils/passport';

export default {
  initialize: (options?: { swaggerSpecOption?: swaggerJSDoc.Options } | undefined) => {
    passportUtil.initialize(passport);
    
    const umzug = new Umzug({
      migrations: { 
        glob: "./services/user-service/migrations/*.ts",
      },
      context: sequelize.getQueryInterface() as any,
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    (async () => {
      await umzug.up();
      //await umzug.down({step: 1 });
    })();

    if(options) {
      if(options.swaggerSpecOption) {
        const actionPath = __dirname + '/actions/**/*.ts';
        if(options.swaggerSpecOption.apis) {
          const apis = options.swaggerSpecOption.apis?.map(e => e);
          apis?.push(actionPath)
          options.swaggerSpecOption.apis = apis;
        } else {
          options.swaggerSpecOption.apis = [actionPath];
        }
      }
    }
    
    const router = express.Router(); 

    router.use(
      session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
      })
    );
    
    router.use(passport.initialize());
    router.use(passport.session());

    router.use("/users/", action);
    return router;
  }
}
