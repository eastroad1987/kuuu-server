import * as AWS from "aws-sdk";
import { ConfigService } from "@nestjs/config";
export declare class S3Service {
    private configService;
    private s3;
    constructor(configService: ConfigService);
    generatePresignedUrl(key: string): Promise<string>;
    listMultipartUploads(): Promise<AWS.S3.ListMultipartUploadsOutput>;
    createMultipartUpload(key: string): Promise<AWS.S3.CreateMultipartUploadOutput>;
    uploadChunkPart(uploadId: string, key: string, partNumber: number, chunk: Buffer): Promise<AWS.S3.UploadPartOutput>;
    completeMultipartUpload(key: string, uploadId: string, parts: AWS.S3.CompletedPart[]): Promise<AWS.S3.CompleteMultipartUploadOutput>;
    abortMultipartUpload(key: string, uploadId: string): Promise<AWS.S3.AbortMultipartUploadOutput>;
}
