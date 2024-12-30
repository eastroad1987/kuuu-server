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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const article_service_1 = require("../article/article.service");
const board_service_1 = require("./board.service");
const jwt_auth_guard_1 = require("../../auth/strategy/jwt-auth.guard");
const get_article_dto_1 = require("../article/dto/get-article.dto");
const create_board_dto_1 = require("./dto/create-board.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
let BoardController = class BoardController {
    constructor(boardService, articleService) {
        this.boardService = boardService;
        this.articleService = articleService;
    }
    getAll() {
        return this.boardService.findAll();
    }
    async findArticlesByBoard(query) {
        return this.boardService.findArticlesByBoard(query);
    }
    findOne(id) {
        return this.boardService.findOne(+id);
    }
    createByAdmin(createBoardDto) {
        return this.boardService.createByAdmin(createBoardDto);
    }
    async updateByAdmin(query) {
        return await this.boardService.updateByAdmin(query);
    }
    async removeByAdmin(query) {
        return await this.boardService.removeByAdmin(query);
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Get)("all"),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 게시판 전체 목록(카테고리) 보기",
        description: "게시판 전체 목록(카테고리)을 제공한다",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: "start",
        required: false,
        type: Number,
        description: "페이지에 보여줄 게시물 시작 번호",
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        type: Number,
        description: "한 페이지에 보여줄 게시물 수",
    }),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 커뮤니티 게시물 목록 보기",
        description: "커뮤니티의 게시물 목록을 제공한다",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_article_dto_1.GetArticlesByBoardDto]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findArticlesByBoard", null);
__decorate([
    (0, common_1.Get)("admin/:id"),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "게시판 id, 1: 자유게시판, 2: QnA 게시판, 3: 로케이션 게시판, 4: 공지사항",
    }),
    (0, swagger_1.ApiOperation)({
        summary: "[서비스] 선택된 게시판 카테고리의 설정 상세 보기",
        description: "선택된 게시판의 상세보기를 제공한다",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("admin"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "새로운 게시판(카테고리) 등록",
        description: "새로운 게시판(카테고리)을 등록한다",
    }),
    (0, swagger_1.ApiBody)({
        required: true,
        isArray: false,
        type: create_board_dto_1.CreateBoardDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDto]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "createByAdmin", null);
__decorate([
    (0, common_1.Patch)("admin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_board_dto_1.UpdateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "updateByAdmin", null);
__decorate([
    (0, common_1.Delete)("admin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_board_dto_1.UpdateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "removeByAdmin", null);
exports.BoardController = BoardController = __decorate([
    (0, swagger_1.ApiTags)("[Service / Admin] 게시판"),
    (0, common_1.Controller)("board"),
    __metadata("design:paramtypes", [board_service_1.BoardService,
        article_service_1.ArticleService])
], BoardController);
//# sourceMappingURL=board.controller.js.map