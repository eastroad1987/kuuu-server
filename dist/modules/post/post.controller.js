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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/strategy/jwt-auth.guard");
const user_decorator_1 = require("../../common/decorator/user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const create_post_dto_1 = require("./dto/create-post.dto");
const get_post_dto_1 = require("./dto/get-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    create(createPostDto, user) {
        return this.postService.create(createPostDto, 1);
    }
    findAll(query) {
        return this.postService.findAll(query);
    }
    async findOne(id) {
        await this.postService.increaseViewCount(+id);
        return this.postService.findOne(+id);
    }
    async findPostsByMonth() {
        console.log("[findPostsByMonth] controller");
        return await this.postService.findPostsByMonth();
    }
    update(id, updatePostDto, user) {
        return this.postService.update(+id, updatePostDto, user.id);
    }
    remove(id, user) {
        return this.postService.remove(+id, user.id);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 생성",
        description: "새로운 게시글을 생성합니다",
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 목록 조회",
        description: "게시글 목록을 조회합니다",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_post_dto_1.GetPostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 상세 조회",
        description: "특정 게시글의 상세 정보를 조회합니다",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("monthly/list"),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 최근 1개월 게시글 조회",
        description: "최근 1개월 동안 작성된 게시글을 조회합니다",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findPostsByMonth", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 수정",
        description: "게시글을 수정합니다",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 삭제",
        description: "게시글을 삭제합니다",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "remove", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiTags)("[Service] 게시글"),
    (0, common_1.Controller)("posts"),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map