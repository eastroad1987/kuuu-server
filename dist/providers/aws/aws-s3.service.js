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
const AWS = require("aws-sdk");
const config_1 = require("@nestjs/config");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        AWS.config.update({
            accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
            region: this.configService.get("AWS_REGION"),
        });
        this.s3 = new AWS.S3();
    }
    async generatePresignedUrl(key) {
        const expires = 3600;
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const params = {
            Bucket: bucketName,
            Key: key,
            Expires: expires,
        };
        return this.s3.getSignedUrlPromise("putObject", params);
    }
    async listMultipartUploads() {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const params = {
            Bucket: bucketName,
        };
        return this.s3.listMultipartUploads(params).promise();
    }
    async createMultipartUpload(key) {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const params = {
            Bucket: bucketName,
            Key: key,
        };
        return this.s3.createMultipartUpload(params).promise();
    }
    async uploadChunkPart(uploadId, key, partNumber, chunk) {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const params = {
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: chunk.buffer,
        };
        return this.s3.uploadPart(params).promise();
    }
    async completeMultipartUpload(key, uploadId, parts) {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const params = {
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts,
            },
        };
        return this.s3.completeMultipartUpload(params).promise();
    }
    async abortMultipartUpload(key, uploadId) {
        const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        const params = {
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
        };
        return this.s3.abortMultipartUpload(params).promise();
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=aws-s3.service.js.map