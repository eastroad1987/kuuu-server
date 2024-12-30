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
exports.Board = void 0;
const BoardTypeEnums_1 = require("../../../common/constants/BoardTypeEnums");
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
const base_entity_1 = require("../../../common/entity/base.entity");
const article_entity_1 = require("../../article/entities/article.entity");
const typeorm_1 = require("typeorm");
let Board = class Board extends base_entity_1.BaseModel {
};
exports.Board = Board;
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.BOARD_NAME,
        nullable: true,
        comment: "게시판명",
        length: 255,
    }),
    __metadata("design:type", String)
], Board.prototype, "boardName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.BOARD_TYPE,
        nullable: true,
        comment: "게시판 타입",
        length: 128,
    }),
    __metadata("design:type", String)
], Board.prototype, "boardType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.ANONYMOUS_YN,
        nullable: true,
        comment: "익명포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "anonymousYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.TITLE_YN,
        nullable: true,
        comment: "제목포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "titleYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.CONTENT_YN,
        nullable: true,
        comment: "내용포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "contentYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.THUMBNAIL_YN,
        nullable: true,
        comment: "썸네일포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "thumbnailYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.REFERENCE_PLACE_YN,
        nullable: true,
        comment: "참조장소포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "referencePlaceYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.SECRET_YN,
        nullable: true,
        comment: "비밀글포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "secretYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.IMAGES_YN,
        nullable: true,
        comment: "이미지 포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "imagesYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.ATTACH_FILES_YN,
        nullable: true,
        comment: "첨부파일포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "attachFilesYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.COMMENT_YN,
        nullable: true,
        comment: "댓글여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "commentYn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.BoardEnums.VIEW_CNT_YN,
        nullable: true,
        comment: "조회수포함여부",
        length: 1,
    }),
    __metadata("design:type", String)
], Board.prototype, "viewCntYn", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_entity_1.Article, (article) => article.board),
    __metadata("design:type", Array)
], Board.prototype, "articles", void 0);
exports.Board = Board = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.BOARD)
], Board);
//# sourceMappingURL=board.entity.js.map