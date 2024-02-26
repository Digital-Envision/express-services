import { FileObject, FileUploadDetails } from '../types/upload.interface';
import AWS from 'aws-sdk';
import { serviceConfig } from '../configs/config';
import { Storage } from '@google-cloud/storage';

export class UploadHandler {
    private s3: AWS.S3;
    private gcs: Storage;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: serviceConfig.aws.accessKeyId,
            secretAccessKey: serviceConfig.aws.secretAccessKey,
            region: serviceConfig.aws.region
        });

        this.gcs = new Storage({
            projectId: serviceConfig.gcs.projectId,
            keyFilename: serviceConfig.gcs.keyFilename
        });
    }

    async uploadFile(fileKey: string, file: Buffer, provider: string): Promise<FileUploadDetails> {
        if (provider === 'aws') {
            return this.uploadToAws(serviceConfig.aws.bucketName, fileKey, file);
        } else if (provider === 'gcs') {
            return this.uploadToGcs(serviceConfig.aws.bucketName, fileKey, file);
        } else {
            throw new Error('Invalid payload provider');
        }
    }

    async uploadFiles(files: FileObject[]) {
        const uploadPromises = files.map(async (file) => {
            const { fileKey, file: fileBuffer, provider } = file;
            return this.uploadFile(fileKey, fileBuffer, provider);
        });

        return Promise.all(uploadPromises);
    }

    private async uploadToAws(bucketName: string, fileKey: string, file: Buffer): Promise<FileUploadDetails> {
        const payload: AWS.S3.PutObjectRequest = {
            Bucket: bucketName,
            Key: fileKey,
            Body: file
        };

        try {
            await this.s3.putObject(payload).promise();
            const location = this.getUploadLocation(bucketName, fileKey);

            return {
                bucket: bucketName,
                key: fileKey,
                location: location
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private async uploadToGcs(bucketName: string, fileKey: string, file: Buffer): Promise<FileUploadDetails> {
        const bucket = this.gcs.bucket(bucketName);
        const fileObject = bucket.file(fileKey);

        try {
            await fileObject.save(file);
            await fileObject.makePublic();

            const location = this.getUploadLocation(bucketName, fileKey);

            return {
                bucket: bucketName,
                key: fileKey,
                location: location
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async removeFile(bucketName: string, fileKey: string, provider: string): Promise<void> {
        if (provider === 'aws') {
            return this.removeFromAws(bucketName, fileKey);
        } else if (provider === 'gcs') {
            return this.removeFromGcs(bucketName, fileKey);
        } else {
            throw new Error('Invalid payload provider');
        }
    }

    private async removeFromAws(bucketName: string, fileKey: string): Promise<void> {
        const payload: AWS.S3.DeleteObjectRequest = {
            Bucket: bucketName,
            Key: fileKey
        };

        try {
            await this.s3.deleteObject(payload).promise();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private async removeFromGcs(bucketName: string, fileKey: string): Promise<void> {
        const bucket = this.gcs.bucket(bucketName);
        const fileObject = bucket.file(fileKey);

        try {
            await fileObject.delete();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private getUploadLocation(bucketName: string, fileKey: string): string {
        return `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
    }
}