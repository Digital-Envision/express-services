import { Dialect, Sequelize } from 'sequelize';
import { serviceConfig } from '../configs/config';

const sequelize = new Sequelize(serviceConfig.db.name,
    serviceConfig.db.user,
    serviceConfig.db.password,
    {
        host: serviceConfig.db.host,
        port: serviceConfig.db.port,
        dialect: serviceConfig.db.dialect as Dialect || 'mysql',
        dialectOptions: {
            ssl: serviceConfig.db.sslMode === 'true',
            decimalNumbers: true,
        },
        pool: {
            max: serviceConfig.db.pool.max,
            min: serviceConfig.db.pool.min,
            acquire: serviceConfig.db.pool.acquire,
            idle: serviceConfig.db.pool.idle,
        },
    });


export default sequelize;
