import 'dotenv/config';

const envMode = process.env.NODE_ENV || 'development';

const serviceConfig = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        name: process.env.DB_NAME || 'mysql',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        dialect: process.env.DB_DIALECT || 'mysql',
        sslMode: process.env.DB_SSL_MODE || 'disable',
        operatorsAliases: 0,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        pool: {
            max: Number(process.env.DB_POOL_MAX) || 100,
            min: Number(process.env.DB_POOL_MIN) || 0,
            acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000,
            idle: Number(process.env.DB_POOL_IDLE) || 20000,
        },
        cache_ttl: Number(process.env.DB_MODEL_CACHE_TTL) || 60,
        cache_namespace:
            Number(process.env.DB_MODEL_CACHE_NAMESPACE) || 'model',
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    },
};

console.log('App is running on', envMode, 'environment');

export { serviceConfig, envMode };