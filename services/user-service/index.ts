import express from 'express';
import { Sequelize, Options } from 'sequelize';
import action from "./actions";
import swaggerJSDoc from 'swagger-jsdoc';
import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from './utils/sequelize';
import path from 'path';

export default {
  initialize: (options?: { swaggerSpecOption?: swaggerJSDoc.Options } | undefined) => {
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
    router.use("/users/", action);
    return router;
  }
}
