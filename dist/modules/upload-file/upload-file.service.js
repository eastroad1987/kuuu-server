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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const aws_s3_service_1 = require("../../providers/aws/aws-s3.service");
const typeorm_2 = require("typeorm");
const upload_file_entity_1 = require("./entities/upload-file.entity");
let UploadFileService = class UploadFileService {
    constructor(configService, s3Service, uploadFileRepository) {
        this.configService = configService;
        this.s3Service = s3Service;
        this.uploadFileRepository = uploadFileRepository;
    }
    create(updateUploadFileDto) {
        return this.uploadFileRepository.save(updateUploadFileDto);
    }
    findAll() {
        return `This action returns all uploadFile`;
    }
    findOne(id) {
        return `This action returns a #${id} uploadFile`;
    }
    update(id, updateUploadFileDto) {
        console.log(updateUploadFileDto);
        return `This action updates a #${id} uploadFile`;
    }
    remove(id) {
        return `This action removes a #${id} uploadFile`;
    }
    async uploadFile(files) {
        const uploadfiles = [];
        console.log("files:", files);
        for (const element of files) {
            const file = new upload_file_entity_1.UploadFile();
            file.originalName = element.originalname;
            file.encoding = element.encoding;
            file.mimeType = element.mimetype;
            file.size = element.size;
            file.url = element.location;
            file.name = element.location.split("/").splice(-1)[0];
            uploadfiles.push(file);
        }
        try {
            return { data: await this.uploadFileRepository.save(uploadfiles) };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createMultipartUpload(key) {
        const listMultipart = await this.s3Service.listMultipartUploads();
        listMultipart.Uploads.map((upload) => {
            this.s3Service.abortMultipartUpload(upload.Key, upload.UploadId);
        });
        const res = await this.s3Service.createMultipartUpload(key);
        return res;
    }
    async uploadPart(uploadId, key, partNumber, body) {
        const res = await this.s3Service.uploadChunkPart(uploadId, key, partNumber, body);
        return { ETag: res.ETag, PartNumber: partNumber };
    }
    async completeMultiPart(uploadId, key, parts) {
        const res = await this.s3Service.completeMultipartUpload(key, uploadId, parts);
        return { location: res.Location };
    }
    async getPreSignedUrl(body) {
        return await this.s3Service.generatePresignedUrl(body.name);
    }
    async abortMultiPart(body) {
        return await this.s3Service.abortMultipartUpload(body.name, body.uploadId);
    }
};
exports.UploadFileService = UploadFileService;
exports.UploadFileService = UploadFileService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(upload_file_entity_1.UploadFile)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        aws_s3_service_1.S3Service,
        typeorm_2.Repository])
], UploadFileService);
//# sourceMappingURL=upload-file.service.js.map