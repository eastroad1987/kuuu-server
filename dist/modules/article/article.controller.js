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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/strategy/jwt-auth.guard");
const user_decorator_1 = require("../../common/decorator/user.decorator");
const article_comment_service_1 = require("../article-comment/article-comment.service");
const user_entity_1 = require("../user/entities/user.entity");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const get_article_dto_1 = require("./dto/get-article.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
let ArticleController = class ArticleController {
    constructor(articleService, articleCommentService) {
        this.articleService = articleService;
        this.articleCommentService = articleCommentService;
    }
    async findAllByAdmin(query) {
        return this.articleService.findAllByAdmin(query);
    }
    createArticle(createArticleDto, user) {
        return this.articleService.updateArticle(Object.assign(Object.assign({}, createArticleDto), { writerId: user.id }));
    }
    removeByAdmin(query) {
        return this.articleService.removeByAdmin(query);
    }
    async findArticleByBoardId(getArticlesByBoard) {
        return this.articleService.findArticlesByBoardId(getArticlesByBoard);
    }
    async findArticle(id, query) {
        return this.articleService.findArticleById(id, query);
    }
    increaseViewCnt(id) {
        return this.articleService.increaseViewCount(+id);
    }
    updateArticle(id, user, updateArticleDto) {
        if (!this.articleService.checkOwnership({
            id,
            writerId: user.id,
        })) {
            throw new common_1.HttpException("직접 작성한 게시글에 대해서만 수정할 수 있습니다", common_1.HttpStatus.BAD_REQUEST);
        }
        return this.articleService.update(+id, updateArticleDto);
    }
    remove(id, user) {
        if (!this.articleService.checkOwnership({
            id,
            writerId: user.id,
        })) {
            throw new common_1.HttpException("직접 작성한 게시글에 대해서만 삭제할 수 있습니다", common_1.HttpStatus.BAD_REQUEST);
        }
        return this.articleService.remove(+id);
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Get)("/admin"),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 모든 게시판 게시글 조회",
        description: "모든 게시판의 게시글을 조회하며, 제목(title), 내용(content)으로 검색",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_article_dto_1.GetArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAllByAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시물 생성",
        description: "게시물을 생성합니다",
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "createArticle", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("/admin"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "removeByAdmin", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 모든 게시판 게시글 조회",
        description: "모든 게시판의 게시글을 조회하며, 제목(title), 내용(content)으로 검색",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_article_dto_1.GetArticlesByBoardDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findArticleByBoardId", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 모든 게시판 게시글 조회",
        description: "모든 게시판의 게시글을 조회하며, 제목(title), 내용(content)으로 검색",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, get_article_dto_1.GetArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findArticle", null);
__decorate([
    (0, common_1.Patch)(":id/increaseViewCnt"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "increaseViewCnt", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시물 수정",
        description: "게시물을 수정합니다",
    }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시물 삭제",
        description: "게시물을 삭제합니다",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "remove", null);
exports.ArticleController = ArticleController = __decorate([
    (0, swagger_1.ApiTags)("[Service / Admin] 게시글"),
    (0, common_1.Controller)("article"),
    __metadata("design:paramtypes", [article_service_1.ArticleService,
        article_comment_service_1.ArticleCommentService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map