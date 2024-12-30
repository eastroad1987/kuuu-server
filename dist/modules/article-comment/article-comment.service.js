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
exports.ArticleCommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("../article/entities/article.entity");
const article_comment_entity_1 = require("./entities/article-comment.entity");
let ArticleCommentService = class ArticleCommentService {
    constructor(commentRepository, articleRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
    }
    async create(createCommentDto) {
        const article = await this.articleRepository
            .createQueryBuilder("article")
            .where({ id: createCommentDto.articleId })
            .getOne();
        if (!article) {
            throw new Error("게시글을 찾을 수 없습니다.");
        }
        return this.commentRepository.save(createCommentDto);
    }
    async update(updateCommentDto) {
        const article = await this.articleRepository
            .createQueryBuilder("article")
            .where({ id: updateCommentDto.articleId })
            .getOne();
        if (!article) {
            throw new Error("게시글을 찾을 수 없습니다.");
        }
        return this.commentRepository.update(updateCommentDto.id, updateCommentDto);
    }
    async remove(updateCommentDto) {
        const article = await this.articleRepository
            .createQueryBuilder("article")
            .where({ id: updateCommentDto.articleId })
            .getOne();
        if (!article) {
            throw new Error("게시글을 찾을 수 없습니다.");
        }
        return await this.commentRepository.delete(updateCommentDto.id);
    }
    async findCommentsByArticle(articleId) {
        const article = await this.articleRepository
            .createQueryBuilder("article")
            .leftJoinAndSelect("article.comments", "comment")
            .where({ id: articleId })
            .getOne();
        if (!article) {
            throw new Error("게시글을 찾을 수 없습니다.");
        }
        return article;
    }
};
exports.ArticleCommentService = ArticleCommentService;
exports.ArticleCommentService = ArticleCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_comment_entity_1.ArticleComment)),
    __param(1, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleCommentService);
//# sourceMappingURL=article-comment.service.js.map