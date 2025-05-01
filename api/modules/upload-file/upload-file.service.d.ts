import { ConfigService } from "@nestjs/config";
import { S3Service } from "../../providers/aws/aws-s3.service";
import { Repository } from "typeorm";
import { UpdateUploadFileDto } from "./dto/update-upload-file.dto";
import { UploadFile } from "./entities/upload-file.entity";
export declare class UploadFileService {
    private configService;
    private s3Service;
    private uploadFileRepository;
    constructor(configService: ConfigService, s3Service: S3Service, uploadFileRepository: Repository<UploadFile>);
    create(updateUploadFileDto: UpdateUploadFileDto): Promise<UpdateUploadFileDto & UploadFile>;
    findAll(): Promise<UploadFile[]>;
    findOne(id: number): Promise<UploadFile>;
    update(id: number, updateUploadFileDto: UpdateUploadFileDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    uploadFile(files: Express.MulterS3.File[]): Promise<{
        data: any[];
    }>;
    createMultipartUpload(key: string): Promise<{
        UploadId: string;
    }>;
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
    getSignedUrl(key: string): Promise<string>;
    abortMultiPart(body: {
        name: string;
        uploadId: string;
    }): Promise<{
        message: string;
    }>;
}
