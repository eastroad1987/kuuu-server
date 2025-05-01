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
exports.SubCategory = void 0;
const base_entity_1 = require("../../../common/entity/base.entity");
const YnEnums_1 = require("../../../common/constants/YnEnums");
const category_entity_1 = require("../../category/entities/category.entity");
const typeorm_1 = require("typeorm");
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
let SubCategory = class SubCategory extends base_entity_1.BaseModel {
};
exports.SubCategory = SubCategory;
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.SubCategoryEnums.TITLE,
        length: 255,
        nullable: true,
        comment: "서브 카테고리 제목",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.ANONYMOUS_YN,
        enum: YnEnums_1.YnEnums,
        comment: "익명 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "anonymousYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.TITLE_YN,
        enum: YnEnums_1.YnEnums,
        comment: "제목 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "titleYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.CONTENT_YN,
        enum: YnEnums_1.YnEnums,
        comment: "내용 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "contentYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.THUMBNAIL_YN,
        enum: YnEnums_1.YnEnums,
        comment: "썸네일 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "thumbnailYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.REFERENCE_PLACE_YN,
        enum: YnEnums_1.YnEnums,
        comment: "참조 장소 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "referencePlaceYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.SECRET_YN,
        enum: YnEnums_1.YnEnums,
        comment: "비밀글 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "secretYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.IMAGES_YN,
        enum: YnEnums_1.YnEnums,
        comment: "이미지 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "imagesYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.ATTACH_FILES_YN,
        enum: YnEnums_1.YnEnums,
        comment: "첨부파일 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "attachFilesYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.COMMENT_YN,
        enum: YnEnums_1.YnEnums,
        comment: "댓글 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "commentYn", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.SubCategoryEnums.VIEW_CNT_YN,
        enum: YnEnums_1.YnEnums,
        comment: "조회수 사용 여부",
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "viewCntYn", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: KuuuTableEnums_1.SubCategoryEnums.CATEGORY_ID }),
    __metadata("design:type", Number)
], SubCategory.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: KuuuTableEnums_1.SubCategoryEnums.CATEGORY_ID }),
    __metadata("design:type", category_entity_1.Category)
], SubCategory.prototype, "category", void 0);
exports.SubCategory = SubCategory = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.SUBCATEGORY)
], SubCategory);
