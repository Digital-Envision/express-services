import 'dotenv/config';

const envMode = process.env.NODE_ENV || 'development';

const serviceConfig = {
    default: {
        emailName: process.env.EMAIL_NAME || '',
        emailFrom: process.env.EMAIL_FROM || '',
    },
    resend: {
        apiKey: process.env.RESEND_API_KEY || '',
    },
    mailgun: {
        apiKey: process.env.MAILGUN_API_KEY || '',
        domain: process.env.MAILGUN_DOMAIN || '',
    },
    mailtrap: {
        apiKey: process.env.MAILTRAP_API_KEY || '',
    }
};

console.log('App is running on', envMode, 'environment');

export { serviceConfig, envMode };