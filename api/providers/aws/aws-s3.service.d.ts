import { ConfigService } from "@nestjs/config";
export declare class S3Service {
    private configService;
    private s3Client;
    constructor(configService: ConfigService);
    generatePresignedUrl(key: string): Promise<string>;
    listMultipartUploads(): Promise<{
        Uploads: import("@aws-sdk/client-s3").MultipartUpload[];
    }>;
    createMultipartUpload(key: string): Promise<{
        UploadId: string;
    }>;
    uploadChunkPart(uploadId: string, key: string, partNumber: number, chunk: Buffer): Promise<{
        ETag: string;
    }>;
    completeMultipartUpload(key: string, uploadId: string, parts: {
        ETag: string;
        PartNumber: number;
    }[]): Promise<{
        Location: string;
    }>;
    abortMultipartUpload(key: string, uploadId: string): Promise<{
        message: string;
    }>;
    getSignedUrl(key: string): Promise<string>;
}
