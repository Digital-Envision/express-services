export interface FileUploadDetails {
    bucket: string;
    key: string;
    location: string;
}

export interface FileObject {
    fileKey: string;
    file: Buffer;
    provider: string;
}