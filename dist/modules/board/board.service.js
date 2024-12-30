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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("../article/entities/article.entity");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const board_entity_1 = require("./entities/board.entity");
let BoardService = class BoardService {
    constructor(boardRepository, articleRepository, userRepository) {
        this.boardRepository = boardRepository;
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.boardRepository.find();
    }
    findOne(id) {
        return this.boardRepository.find({
            where: {
                id,
            },
        });
    }
    async findArticlesByBoard(getArticlesByBoard) {
        const { id, start, limit, sort, title, content } = getArticlesByBoard;
        if (id) {
            let qb = this.articleRepository
                .createQueryBuilder("article")
                .where("article.board_id = :boardId", { boardId: id });
            if (title || content) {
                qb = qb.andWhere(new typeorm_2.Brackets((_qb) => {
                    _qb
                        .where("article.title like :title", { title: `%${title}%` })
                        .orWhere("article.content like :content", { content: `%${content}%` })
                        .orWhere("article.writerName like :content", { content: `%${content}%` })
                        .orWhere("article.summary like :content", { content: `%${content}%` })
                        .orWhere("article.referencePlace like :referencePlace", {
                        referencePlace: `%${content}%`,
                    });
                }));
            }
            if (sort) {
                const [col, order] = sort.split(":");
                qb = qb.orderBy(`article.${col}`, order);
            }
            qb = qb.addOrderBy(`article.createdAt`, "DESC");
            const [data, totalCount] = await qb
                .skip(start || 0)
                .take(limit || 30)
                .getManyAndCount();
            return { data: data, totalCount: totalCount };
        }
        else {
            return { data: [], totalCount: 0 };
        }
    }
    createByAdmin(createBoardDto) {
        return this.boardRepository.save(createBoardDto);
    }
    updateByAdmin(query) {
        if (!query.id) {
            return this.boardRepository.save(Object.assign({}, query));
        }
        else {
            return this.boardRepository.update(query.id, query);
        }
    }
    removeByAdmin(query) {
        return this.boardRepository.delete(query.id);
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __param(1, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BoardService);
//# sourceMappingURL=board.service.js.map