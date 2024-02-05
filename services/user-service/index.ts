import express from 'express';
import { Options } from 'sequelize';
import action from "./actions";
import swaggerJSDoc from 'swagger-jsdoc';

export default {
  initialize: (options: { database: Options, swaggerSpecOption?: swaggerJSDoc.Options }) => {
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
    
    const router = express.Router(); 
    router.use("/users/", action);
    return router;
  }
}
