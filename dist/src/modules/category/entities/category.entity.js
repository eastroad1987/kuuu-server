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
exports.Category = void 0;
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
const base_entity_1 = require("../../../common/entity/base.entity");
const sub_category_entity_1 = require("../../../modules/sub-category/entities/sub-category.entity");
const typeorm_1 = require("typeorm");
let Category = class Category extends base_entity_1.BaseModel {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.CategoryEnums.TITLE,
        length: 255,
        nullable: false,
        unique: true,
        comment: "카테고리 제목",
    }),
    __metadata("design:type", String)
], Category.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_category_entity_1.SubCategory, (subcategory) => subcategory.category),
    __metadata("design:type", Array)
], Category.prototype, "subcategories", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.CATEGORY)
], Category);
