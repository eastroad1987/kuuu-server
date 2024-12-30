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
exports.Article = void 0;
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
const base_entity_1 = require("../../../common/entity/base.entity");
const article_comment_entity_1 = require("../../article-comment/entities/article-comment.entity");
const board_entity_1 = require("../../board/entities/board.entity");
const typeorm_1 = require("typeorm");
let Article = class Article extends base_entity_1.BaseModel {
};
exports.Article = Article;
__decorate([
    (0, typeorm_1.Column)("int", {
        name: KuuuTableEnums_1.ArticleEnums.WRITER_ID,
        nullable: false,
        comment: "작성자 아이디",
    }),
    __metadata("design:type", Number)
], Article.prototype, "writerId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.ArticleEnums.WRITER_NAME,
        nullable: true,
        comment: "작성자명",
        length: 250,
    }),
    __metadata("design:type", String)
], Article.prototype, "writerName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.ArticleEnums.TITLE,
        nullable: true,
        comment: "제목",
        length: 250,
    }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.ArticleEnums.CONTENT,
        nullable: true,
        comment: "내용",
        length: 5000,
    }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.ArticleEnums.SUMMARY,
        nullable: true,
        comment: "내용",
        length: 1000,
    }),
    __metadata("design:type", String)
], Article.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)("json", {
        name: KuuuTableEnums_1.ArticleEnums.THUMBNAIL,
        nullable: true,
        comment: "썸네일주소",
    }),
    __metadata("design:type", Object)
], Article.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)("json", {
        name: KuuuTableEnums_1.ArticleEnums.REFERENCE_PLACE,
        nullable: true,
        comment: "참조장소",
    }),
    __metadata("design:type", Object)
], Article.prototype, "referencePlace", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { name: KuuuTableEnums_1.ArticleEnums.ATTACH_FILES, nullable: true, comment: "첨부파일" }),
    __metadata("design:type", Object)
], Article.prototype, "attachFiles", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { name: KuuuTableEnums_1.ArticleEnums.IMAGES, nullable: true, comment: "이미지들" }),
    __metadata("design:type", Object)
], Article.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: KuuuTableEnums_1.ArticleEnums.VIEW_CNT,
        nullable: false,
        comment: "조회수",
        default: 0,
    }),
    __metadata("design:type", Number)
], Article.prototype, "viewCnt", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: KuuuTableEnums_1.ArticleEnums.BOARD_ID, comment: "게시판타입아이디" }),
    __metadata("design:type", Number)
], Article.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)([{ name: KuuuTableEnums_1.ArticleEnums.BOARD_ID, referencedColumnName: KuuuTableEnums_1.ArticleEnums.BOARD_ID }]),
    __metadata("design:type", board_entity_1.Board)
], Article.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_comment_entity_1.ArticleComment, (comment) => comment.article),
    __metadata("design:type", Array)
], Article.prototype, "comments", void 0);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.ARTICLE)
], Article);
//# sourceMappingURL=article.entity.js.map