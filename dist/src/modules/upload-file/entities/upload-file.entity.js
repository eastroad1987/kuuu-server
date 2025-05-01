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
exports.UploadFile = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entity/base.entity");
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
let UploadFile = class UploadFile extends base_entity_1.BaseModel {
};
exports.UploadFile = UploadFile;
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UploadFileEnums.NAME,
        nullable: true,
        comment: "파일명",
        length: 255,
    }),
    __metadata("design:type", String)
], UploadFile.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UploadFileEnums.ORIGINAL_NAME,
        nullable: true,
        comment: "원본파일명",
        length: 255,
    }),
    __metadata("design:type", String)
], UploadFile.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UploadFileEnums.ENCODING,
        nullable: true,
        comment: "인코딩",
        length: 255,
    }),
    __metadata("design:type", String)
], UploadFile.prototype, "encoding", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UploadFileEnums.MIME_TYPE,
        nullable: true,
        comment: "MIME 타입",
        length: 255,
    }),
    __metadata("design:type", String)
], UploadFile.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { name: KuuuTableEnums_1.UploadFileEnums.SIZE, precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], UploadFile.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: KuuuTableEnums_1.UploadFileEnums.URL, comment: "s3 업로드된 location url" }),
    __metadata("design:type", String)
], UploadFile.prototype, "url", void 0);
exports.UploadFile = UploadFile = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.UPLOAD_FILE)
], UploadFile);
