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
exports.Post = void 0;
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
const base_entity_1 = require("../../../common/entity/base.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const sub_category_entity_1 = require("../../sub-category/entities/sub-category.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Post = class Post extends base_entity_1.BaseModel {
};
exports.Post = Post;
__decorate([
    (0, typeorm_1.Column)("text", {
        name: KuuuTableEnums_1.PostEnums.SUMMARY,
        nullable: false,
        comment: "요약",
    }),
    __metadata("design:type", String)
], Post.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.PostEnums.TITLE,
        length: 255,
        nullable: false,
        comment: "제목",
    }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text", {
        name: KuuuTableEnums_1.PostEnums.CONTENT,
        nullable: false,
        comment: "내용",
    }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.PostEnums.THUMBNAIL,
        length: 255,
        nullable: true,
        comment: "썸네일",
    }),
    __metadata("design:type", String)
], Post.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.PostEnums.REFERENCE_PLACE,
        length: 255,
        nullable: true,
        comment: "참조 장소",
    }),
    __metadata("design:type", String)
], Post.prototype, "referencePlace", void 0);
__decorate([
    (0, typeorm_1.Column)("text", {
        name: KuuuTableEnums_1.PostEnums.IMAGES,
        nullable: true,
        comment: "이미지들",
    }),
    __metadata("design:type", String)
], Post.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)("text", {
        name: KuuuTableEnums_1.PostEnums.ATTACH_FILES,
        nullable: true,
        comment: "첨부파일들",
    }),
    __metadata("design:type", String)
], Post.prototype, "attachFiles", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", {
        name: KuuuTableEnums_1.PostEnums.AUTHOR_ID,
        nullable: false,
        comment: "작성자 ID",
    }),
    __metadata("design:type", Number)
], Post.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: KuuuTableEnums_1.PostEnums.VIEW_CNT,
        default: 0,
        comment: "조회수",
    }),
    __metadata("design:type", Number)
], Post.prototype, "viewCnt", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", {
        name: KuuuTableEnums_1.PostEnums.SUBCATEGORY_ID,
        nullable: true,
        comment: "서브카테고리 ID",
    }),
    __metadata("design:type", Number)
], Post.prototype, "subcategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", {
        name: KuuuTableEnums_1.PostEnums.CATEGORY_ID,
        nullable: false,
        comment: "카테고리 ID",
    }),
    __metadata("design:type", Number)
], Post.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: KuuuTableEnums_1.PostEnums.AUTHOR_ID }),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_category_entity_1.SubCategory, { onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: KuuuTableEnums_1.PostEnums.SUBCATEGORY_ID }),
    __metadata("design:type", sub_category_entity_1.SubCategory)
], Post.prototype, "subcategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: KuuuTableEnums_1.PostEnums.CATEGORY_ID }),
    __metadata("design:type", category_entity_1.Category)
], Post.prototype, "category", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.POST)
], Post);
