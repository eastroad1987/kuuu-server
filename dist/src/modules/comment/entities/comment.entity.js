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
exports.Comment = void 0;
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
const base_entity_1 = require("../../../common/entity/base.entity");
const post_entity_1 = require("../../post/entities/post.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Comment = class Comment extends base_entity_1.BaseModel {
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.Column)("bigint", {
        name: KuuuTableEnums_1.CommentEnums.POST_ID,
        nullable: false,
        comment: "게시글 ID",
    }),
    __metadata("design:type", Number)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", {
        name: KuuuTableEnums_1.CommentEnums.AUTHOR_ID,
        nullable: false,
        comment: "작성자 ID",
    }),
    __metadata("design:type", Number)
], Comment.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)("text", {
        name: KuuuTableEnums_1.CommentEnums.CONTENT,
        nullable: false,
        comment: "댓글 내용",
    }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.CommentEnums.WRITE_NAME,
        length: 255,
        nullable: false,
        comment: "작성자 이름",
    }),
    __metadata("design:type", String)
], Comment.prototype, "writeName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.CommentEnums.FILE_PATH,
        length: 255,
        nullable: true,
        comment: "파일 경로",
    }),
    __metadata("design:type", String)
], Comment.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", {
        name: KuuuTableEnums_1.CommentEnums.PARENT_COMMENT_ID,
        nullable: true,
        comment: "부모 댓글 ID",
    }),
    __metadata("design:type", Number)
], Comment.prototype, "parentCommentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: KuuuTableEnums_1.CommentEnums.POST_ID }),
    __metadata("design:type", post_entity_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: KuuuTableEnums_1.CommentEnums.AUTHOR_ID }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Comment, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: KuuuTableEnums_1.CommentEnums.PARENT_COMMENT_ID }),
    __metadata("design:type", Comment)
], Comment.prototype, "parentComment", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.COMMENT)
], Comment);
