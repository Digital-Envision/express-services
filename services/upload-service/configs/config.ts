import 'dotenv/config';

const envMode = process.env.NODE_ENV || 'development';

const serviceConfig = {
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        region: process.env.AWS_REGION || '',
        bucketName: process.env.AWS_BUCKET || ''
    },
    gcs: {
        projectId: process.env.GCS_PROJECT_ID || '',
        keyFilename: process.env.GCS_KEY_FILENAME || '',
        bucketName: process.env.GCS_BUCKET_NAME || '',
    }
};

console.log('App is running on', envMode, 'environment');

export { serviceConfig, envMode };