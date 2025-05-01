"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const file_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file.interceptor");
const files_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/files.interceptor");
const AWS = __importStar(require("aws-sdk"));
require("dotenv/config");
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_s3_service_1 = require("../../providers/aws/aws-s3.service");
const update_upload_file_dto_1 = require("./dto/update-upload-file.dto");
const upload_file_service_1 = require("./upload-file.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Client = new client_s3_1.S3Client({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
let UploadFileController = class UploadFileController {
    constructor(uploadFileService, s3Service, configService) {
        this.uploadFileService = uploadFileService;
        this.s3Service = s3Service;
        this.configService = configService;
        AWS.config.update({
            accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
            region: "ap-northeast-2",
        });
        this.bucket = configService.get("AWS_S3_BUCKET_NAME");
    }
    async getPresignedUrl(key) {
        const url = await this.s3Service.generatePresignedUrl(key);
        return { url };
    }
    async uploadFile(files) {
        return this.uploadFileService.uploadFile(files);
    }
    async postPresignedUrl(body) {
        return await this.uploadFileService.getPreSignedUrl(body);
    }
    async createMultiPart(key) {
        return await this.uploadFileService.createMultipartUpload(key);
    }
    async uploadPart(file, uploadId, key, partNumber) {
        return await this.uploadFileService.uploadPart(uploadId, key, partNumber, file);
    }
    async completeMultiPart(uploadId, key, parts) {
        return await this.uploadFileService.completeMultiPart(uploadId, key, parts);
    }
    async abortMultiPart(body) {
        return await this.uploadFileService.abortMultiPart(body);
    }
    createUploadFile(file, updateUploadFileDto) {
        console.log(file);
        console.log(updateUploadFileDto);
        return this.uploadFileService.create(updateUploadFileDto);
    }
    findAll() {
        return this.uploadFileService.findAll();
    }
    findOne(id) {
        return this.uploadFileService.findOne(+id);
    }
    update(id, updateUploadFileDto) {
        return this.uploadFileService.update(+id, updateUploadFileDto);
    }
    remove(id) {
        return this.uploadFileService.remove(+id);
    }
};
exports.UploadFileController = UploadFileController;
__decorate([
    (0, common_1.Get)("presigned-url"),
    __param(0, (0, common_1.Query)("key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "getPresignedUrl", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, files_interceptor_1.FilesInterceptor)("file", 20, {
        storage: (0, multer_s3_1.default)({
            s3: s3Client,
            bucket: "s3-kuuu",
            key: function (request, file, cb) {
                cb(null, `${Date.now().toString()}-${file.originalname}`);
            },
        }),
        limits: {},
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)("get-presigned-url"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "postPresignedUrl", null);
__decorate([
    (0, common_1.Post)("create-multipart"),
    __param(0, (0, common_1.Body)("key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "createMultiPart", null);
__decorate([
    (0, common_1.Post)("upload-part"),
    (0, common_1.UseInterceptors)((0, file_interceptor_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)("uploadId")),
    __param(2, (0, common_1.Body)("key")),
    __param(3, (0, common_1.Body)("partNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "uploadPart", null);
__decorate([
    (0, common_1.Post)("complete-multipart"),
    __param(0, (0, common_1.Body)("uploadId")),
    __param(1, (0, common_1.Body)("key")),
    __param(2, (0, common_1.Body)("parts")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "completeMultiPart", null);
__decorate([
    (0, common_1.Post)("abort-multipart"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "abortMultiPart", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseInterceptors)((0, file_interceptor_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_upload_file_dto_1.UpdateUploadFileDto]),
    __metadata("design:returntype", void 0)
], UploadFileController.prototype, "createUploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UploadFileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadFileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_upload_file_dto_1.UpdateUploadFileDto]),
    __metadata("design:returntype", void 0)
], UploadFileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadFileController.prototype, "remove", null);
exports.UploadFileController = UploadFileController = __decorate([
    (0, common_1.Controller)("upload-file"),
    __metadata("design:paramtypes", [upload_file_service_1.UploadFileService,
        aws_s3_service_1.S3Service,
        config_1.ConfigService])
], UploadFileController);
