import { ConfigService } from "@nestjs/config";
import { S3Service } from "providers/aws/aws-s3.service";
import { Repository } from "typeorm";
import { UpdateUploadFileDto } from "./dto/update-upload-file.dto";
import { UploadFile } from "./entities/upload-file.entity";
export declare class UploadFileService {
    private configService;
    private s3Service;
    private uploadFileRepository;
    constructor(configService: ConfigService, s3Service: S3Service, uploadFileRepository: Repository<UploadFile>);
    create(updateUploadFileDto: UpdateUploadFileDto): Promise<UpdateUploadFileDto & UploadFile>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUploadFileDto: UpdateUploadFileDto): string;
    remove(id: number): string;
    uploadFile(files: Express.MulterS3.File[]): Promise<{
        data: any[];
    }>;
    createMultipartUpload(key: string): Promise<import("aws-sdk/clients/s3").CreateMultipartUploadOutput>;
    uploadPart(uploadId: string, key: string, partNumber: number, body: Buffer): Promise<{
        ETag: string;
        PartNumber: number;
    }>;
    completeMultiPart(uploadId: string, key: string, parts: {
        ETag: string;
        PartNumber: number;
    }[]): Promise<{
        location: string;
    }>;
    getPreSignedUrl(body: any): Promise<string>;
    abortMultiPart(body: any): Promise<import("aws-sdk/clients/s3").AbortMultipartUploadOutput>;
}
