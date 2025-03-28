import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";
import "dotenv/config";
import { S3Service } from "providers/aws/aws-s3.service";
import { UpdateUploadFileDto } from "./dto/update-upload-file.dto";
import { UploadFileService } from "./upload-file.service";
export declare class UploadFileController {
    private readonly uploadFileService;
    private readonly s3Service;
    private configService;
    private bucket;
    constructor(uploadFileService: UploadFileService, s3Service: S3Service, configService: ConfigService);
    getPresignedUrl(key: string): Promise<{
        url: string;
    }>;
    uploadFile(files: Express.MulterS3.File[]): Promise<{
        data: any[];
    }>;
    postPresignedUrl(body: any): Promise<string>;
    createMultiPart(key: string): Promise<AWS.S3.CreateMultipartUploadOutput>;
    uploadPart(file: any, uploadId: string, key: string, partNumber: number): Promise<{
        ETag: string;
        PartNumber: number;
    }>;
    completeMultiPart(uploadId: string, key: string, parts: {
        ETag: string;
        PartNumber: number;
    }[]): Promise<{
        location: string;
    }>;
    abortMultiPart(body: any): Promise<AWS.S3.AbortMultipartUploadOutput>;
    createUploadFile(file: any, updateUploadFileDto: UpdateUploadFileDto): Promise<UpdateUploadFileDto & import("./entities/upload-file.entity").UploadFile>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUploadFileDto: UpdateUploadFileDto): string;
    remove(id: string): string;
}
