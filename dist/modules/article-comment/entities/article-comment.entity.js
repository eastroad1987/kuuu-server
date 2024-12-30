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
exports.ArticleComment = void 0;
const typeorm_1 = require("typeorm");
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
const base_entity_1 = require("../../../common/entity/base.entity");
const article_entity_1 = require("../../article/entities/article.entity");
let ArticleComment = class ArticleComment extends base_entity_1.BaseModel {
};
exports.ArticleComment = ArticleComment;
__decorate([
    (0, typeorm_1.Column)("int", {
        name: KuuuTableEnums_1.ArticleCommentEnums.WRITER_ID,
        nullable: true,
        comment: "작성자아이디",
    }),
    __metadata("design:type", Number)
], ArticleComment.prototype, "writerId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.ArticleCommentEnums.WRITER_NAME,
        nullable: true,
        comment: "작성자명",
        length: 250,
    }),
    __metadata("design:type", String)
], ArticleComment.prototype, "writerName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.ArticleCommentEnums.COMMENT,
        nullable: true,
        comment: "내용",
        length: 5000,
    }),
    __metadata("design:type", String)
], ArticleComment.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.ArticleCommentEnums.FILE_PATH,
        nullable: true,
        comment: "파일이나 이미지",
        length: 500,
    }),
    __metadata("design:type", String)
], ArticleComment.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: KuuuTableEnums_1.ArticleCommentEnums.ARTICLE_ID, comment: "글 아이디" }),
    __metadata("design:type", Number)
], ArticleComment.prototype, "articleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => article_entity_1.Article, (article) => article.comments, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([
        { name: KuuuTableEnums_1.ArticleCommentEnums.ARTICLE_ID, referencedColumnName: KuuuTableEnums_1.ArticleCommentEnums.ID },
    ]),
    __metadata("design:type", article_entity_1.Article)
], ArticleComment.prototype, "article", void 0);
exports.ArticleComment = ArticleComment = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.ARTICLE_COMMENT)
], ArticleComment);
//# sourceMappingURL=article-comment.entity.js.map