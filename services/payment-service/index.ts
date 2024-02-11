import swaggerJSDoc, { Options } from "swagger-jsdoc";
import router from './routes/index.route';

export default {
    initialize: (options: { database: Options, swaggerSpecOption?: swaggerJSDoc.Options }) => {
        if (options.swaggerSpecOption) {
            const actionPath = __dirname + '/actions/**/*.action.ts';
            if (options.swaggerSpecOption.apis) {
                const apis = options.swaggerSpecOption.apis?.map(e => e);
                apis?.push(actionPath)
                options.swaggerSpecOption.apis = apis;
            } else {
                options.swaggerSpecOption.apis = [actionPath];
            }
        }

        return router;
    }
}