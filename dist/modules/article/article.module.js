"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_comment_entity_1 = require("../article-comment/entities/article-comment.entity");
const board_entity_1 = require("../board/entities/board.entity");
const user_entity_1 = require("../user/entities/user.entity");
const article_comment_service_1 = require("../article-comment/article-comment.service");
const article_controller_1 = require("./article.controller");
const article_service_1 = require("./article.service");
const article_entity_1 = require("./entities/article.entity");
let ArticleModule = class ArticleModule {
};
exports.ArticleModule = ArticleModule;
exports.ArticleModule = ArticleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([article_entity_1.Article, article_comment_entity_1.ArticleComment, board_entity_1.Board, user_entity_1.User])],
        controllers: [article_controller_1.ArticleController],
        providers: [article_service_1.ArticleService, article_comment_service_1.ArticleCommentService],
    })
], ArticleModule);
//# sourceMappingURL=article.module.js.map