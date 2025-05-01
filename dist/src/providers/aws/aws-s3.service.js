"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get("AWS_REGION"),
            credentials: {
                accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
            },
        });
    }
    async generatePresignedUrl(key) {
        const expires = 3600;
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const command = new client_s3_1.GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: expires });
    }
    async listMultipartUploads() {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const command = new client_s3_1.ListMultipartUploadsCommand({
            Bucket: bucketName,
        });
        const response = await this.s3Client.send(command);
        return { Uploads: response.Uploads || [] };
    }
    async createMultipartUpload(key) {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const command = new client_s3_1.CreateMultipartUploadCommand({
            Bucket: bucketName,
            Key: key,
        });
        const response = await this.s3Client.send(command);
        return { UploadId: response.UploadId };
    }
    async uploadChunkPart(uploadId, key, partNumber, chunk) {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const command = new client_s3_1.UploadPartCommand({
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: chunk,
        });
        const response = await this.s3Client.send(command);
        return { ETag: response.ETag };
    }
    async completeMultipartUpload(key, uploadId, parts) {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const command = new client_s3_1.CompleteMultipartUploadCommand({
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts,
            },
        });
        const response = await this.s3Client.send(command);
        return { Location: response.Location };
    }
    async abortMultipartUpload(key, uploadId) {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const command = new client_s3_1.AbortMultipartUploadCommand({
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
        });
        await this.s3Client.send(command);
        return { message: "Multipart upload aborted successfully" };
    }
    async getSignedUrl(key) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.configService.get("AWS_S3_BUCKET_NAME"),
            Key: key,
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: 3600 });
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=aws-s3.service.js.map