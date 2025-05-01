"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileModule = void 0;
const common_1 = require("@nestjs/common");
const aws_s3_service_1 = require("../../providers/aws/aws-s3.service");
const upload_file_service_1 = require("./upload-file.service");
const upload_file_controller_1 = require("./upload-file.controller");
const typeorm_1 = require("@nestjs/typeorm");
const upload_file_entity_1 = require("./entities/upload-file.entity");
let UploadFileModule = class UploadFileModule {
};
exports.UploadFileModule = UploadFileModule;
exports.UploadFileModule = UploadFileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([upload_file_entity_1.UploadFile])],
        controllers: [upload_file_controller_1.UploadFileController],
        providers: [upload_file_service_1.UploadFileService, aws_s3_service_1.S3Service],
    })
], UploadFileModule);
//# sourceMappingURL=upload-file.module.js.map