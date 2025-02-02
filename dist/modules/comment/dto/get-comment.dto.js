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
exports.GetCommentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetCommentDto {
}
exports.GetCommentDto = GetCommentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "게시글 ID", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetCommentDto.prototype, "postId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "작성자 ID", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetCommentDto.prototype, "authorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "검색할 내용", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCommentDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "시작 위치", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetCommentDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "가져올 항목 수", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetCommentDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "정렬 (예: createdAt:DESC)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCommentDto.prototype, "sort", void 0);
//# sourceMappingURL=get-comment.dto.js.map