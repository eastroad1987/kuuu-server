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
exports.CreateSubCategoryDto = void 0;
const class_validator_1 = require("class-validator");
const YnEnums_1 = require("../../../common/constants/YnEnums");
class CreateSubCategoryDto {
    constructor() {
        this.anonymousYn = YnEnums_1.YnEnums.N;
        this.titleYn = YnEnums_1.YnEnums.Y;
        this.contentYn = YnEnums_1.YnEnums.Y;
        this.thumbnailYn = YnEnums_1.YnEnums.N;
        this.referencePlaceYn = YnEnums_1.YnEnums.N;
        this.secretYn = YnEnums_1.YnEnums.N;
        this.imagesYn = YnEnums_1.YnEnums.N;
        this.attachFilesYn = YnEnums_1.YnEnums.N;
        this.commentYn = YnEnums_1.YnEnums.Y;
        this.viewCntYn = YnEnums_1.YnEnums.Y;
    }
}
exports.CreateSubCategoryDto = CreateSubCategoryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSubCategoryDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "anonymousYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "titleYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "contentYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "thumbnailYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "referencePlaceYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "secretYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "imagesYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "attachFilesYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "commentYn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubCategoryDto.prototype, "viewCntYn", void 0);
