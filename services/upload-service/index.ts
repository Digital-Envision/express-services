import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import action from './actions/index.action';

export default {
    initialize: (options: { swaggerSpecOption?: swaggerJSDoc.Options }) => {
        if (options.swaggerSpecOption) {
            const actionPath = __dirname + '/actions/**/*.ts';
            if (options.swaggerSpecOption.apis) {
                const apis = options.swaggerSpecOption.apis?.map(e => e);
                apis?.push(actionPath)
                options.swaggerSpecOption.apis = apis;
            } else {
                options.swaggerSpecOption.apis = [actionPath];
            }
        }

        const router = express.Router();
        router.use('/upload', action);
        return router;
    }
}
