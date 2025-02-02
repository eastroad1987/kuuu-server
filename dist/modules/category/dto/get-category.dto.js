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
exports.GetCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetCategoryDto {
}
exports.GetCategoryDto = GetCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "검색할 카테고리 제목", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCategoryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "시작 위치", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetCategoryDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "가져올 항목 수", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetCategoryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "정렬 (예: createdAt:DESC)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCategoryDto.prototype, "sort", void 0);
//# sourceMappingURL=get-category.dto.js.map