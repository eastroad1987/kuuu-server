"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../category/entities/category.entity");
const sub_category_controller_1 = require("./sub-category.controller");
const sub_category_service_1 = require("./sub-category.service");
const sub_category_entity_1 = require("./entities/sub-category.entity");
const post_entity_1 = require("../post/entities/post.entity");
let SubCategoryModule = class SubCategoryModule {
};
exports.SubCategoryModule = SubCategoryModule;
exports.SubCategoryModule = SubCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sub_category_entity_1.SubCategory, category_entity_1.Category, post_entity_1.Post])],
        controllers: [sub_category_controller_1.SubCategoryController],
        providers: [sub_category_service_1.SubCategoryService],
    })
], SubCategoryModule);
