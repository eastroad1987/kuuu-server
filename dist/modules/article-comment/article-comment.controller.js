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
exports.ArticleCommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const article_comment_service_1 = require("./article-comment.service");
const create_article_comment_dto_1 = require("./dto/create-article-comment.dto");
const update_article_comment_dto_1 = require("./dto/update-article-comment.dto");
let ArticleCommentController = class ArticleCommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    create(createArticleDto) {
        return this.commentService.create(createArticleDto);
    }
    update(updateCommentDto) {
        return this.commentService.update(updateCommentDto);
    }
    async remove(updateCommentDto) {
        return await this.commentService.remove(updateCommentDto);
    }
    async findCommentsByArticle(articleId) {
        return await this.commentService.findCommentsByArticle(articleId);
    }
};
exports.ArticleCommentController = ArticleCommentController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 댓글 생성",
        description: "댓글을 생성합니다",
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_comment_dto_1.CreateArticleCommentDto]),
    __metadata("design:returntype", void 0)
], ArticleCommentController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 댓글 수정",
        description: "댓글의 내용을 수정합니다",
    }),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_article_comment_dto_1.UpdateArticleCommentDto]),
    __metadata("design:returntype", void 0)
], ArticleCommentController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 댓글 삭제",
        description: "댓글을 삭제합니다",
    }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_article_comment_dto_1.UpdateArticleCommentDto]),
    __metadata("design:returntype", Promise)
], ArticleCommentController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시글 댓글 리스트",
        description: "댓글 리스트",
    }),
    (0, common_1.Get)(":articleId"),
    __param(0, (0, common_1.Param)("articleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleCommentController.prototype, "findCommentsByArticle", null);
exports.ArticleCommentController = ArticleCommentController = __decorate([
    (0, swagger_1.ApiTags)("[Service] 게시글 댓글"),
    (0, common_1.Controller)("article-comment"),
    __metadata("design:paramtypes", [article_comment_service_1.ArticleCommentService])
], ArticleCommentController);
//# sourceMappingURL=article-comment.controller.js.map