import { Sequelize } from 'sequelize';
import { serviceConfig, envMode } from '../configs/config';

const config = serviceConfig[envMode]

const sequelize = new Sequelize(config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect ?? 'mysql',
        dialectOptions: {
            ssl: config.db.sslMode === 'true',
            decimalNumbers: true,
        },
        pool: {
            max: config.db.pool.max,
            min: config.db.pool.min,
            acquire: config.db.pool.acquire,
            idle: config.db.pool.idle,
        },
    });


export default sequelize;
