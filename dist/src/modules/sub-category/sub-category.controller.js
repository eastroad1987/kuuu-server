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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/strategy/jwt-auth.guard");
const create_sub_category_dto_1 = require("./dto/create-sub-category.dto");
const get_sub_category_dto_1 = require("./dto/get-sub-category.dto");
const update_sub_category_dto_1 = require("./dto/update-sub-category.dto");
const sub_category_service_1 = require("./sub-category.service");
let SubCategoryController = class SubCategoryController {
    constructor(subCategoryService) {
        this.subCategoryService = subCategoryService;
    }
    create(createSubCategoryDto) {
        return this.subCategoryService.create(createSubCategoryDto);
    }
    findAll(query) {
        return this.subCategoryService.findAll(query);
    }
    findPostsBySubCategoryId(id, query) {
        return this.subCategoryService.findPostsBySubCategoryId(+id, query);
    }
    findOne(id) {
        return this.subCategoryService.findOne(+id);
    }
    update(id, updateSubCategoryDto) {
        return this.subCategoryService.update(+id, updateSubCategoryDto);
    }
    remove(id) {
        return this.subCategoryService.remove(+id);
    }
};
exports.SubCategoryController = SubCategoryController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_category_dto_1.CreateSubCategoryDto]),
    __metadata("design:returntype", void 0)
], SubCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_sub_category_dto_1.GetSubCategoryDto]),
    __metadata("design:returntype", void 0)
], SubCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id/posts"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_sub_category_dto_1.GetSubCategoryDto]),
    __metadata("design:returntype", void 0)
], SubCategoryController.prototype, "findPostsBySubCategoryId", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sub_category_dto_1.UpdateSubCategoryDto]),
    __metadata("design:returntype", void 0)
], SubCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubCategoryController.prototype, "remove", null);
exports.SubCategoryController = SubCategoryController = __decorate([
    (0, common_1.Controller)("subcategory"),
    __metadata("design:paramtypes", [sub_category_service_1.SubCategoryService])
], SubCategoryController);
