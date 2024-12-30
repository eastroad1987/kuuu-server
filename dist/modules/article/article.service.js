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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_comment_entity_1 = require("../article-comment/entities/article-comment.entity");
const article_entity_1 = require("./entities/article.entity");
const transactional_repository_1 = require("../../common/unit-of-work/transactional.repository");
const unit_of_work_provider_1 = require("../../common/unit-of-work/unit-of-work.provider");
const likeScrapUtil_1 = require("../../common/util/likeScrapUtil");
const user_entity_1 = require("../user/entities/user.entity");
const parseMethod_1 = require("../../common/util/parseMethod");
let ArticleService = class ArticleService {
    constructor(articleRepository, commentRepository, userRepository, uow, repository) {
        this.articleRepository = articleRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.uow = uow;
        this.repository = repository;
    }
    create(createArticleDto) {
        return this.articleRepository.save(Object.assign({}, createArticleDto));
    }
    async findArticleById(id, getArticleDto) {
        console.log(id, getArticleDto);
        const article = await this.articleRepository
            .createQueryBuilder("article")
            .leftJoinAndSelect("article.comments", "comment")
            .where({ id: id })
            .getOne();
        if (!article) {
            throw new Error("게시글을 찾을 수 없습니다.");
        }
        return article;
    }
    async findArticlesByBoardId(getArticlesByBoard) {
        const { start, limit, id, sort, title, content } = getArticlesByBoard;
        let qb = this.articleRepository
            .createQueryBuilder("article")
            .where("article.boardId = :id", { id });
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
        return { data, totalCount };
    }
    async increaseViewCount(id) {
        const { viewCnt } = await this.articleRepository.findOne({ where: { id } });
        await this.articleRepository.update(+id, {
            viewCnt: viewCnt + 1,
        });
    }
    async findAll({ endDate, limit, sort, start, startDate, title, content }) {
        let qb = this.articleRepository
            .createQueryBuilder("article")
            .orderBy("article.createdAt", "DESC");
        if (title || content) {
            qb = qb.andWhere(new typeorm_2.Brackets((_qb) => {
                _qb
                    .where("article.title like :title", { title: `%${title}%` })
                    .orWhere("article.content like :content", { content: `%${content}%` })
                    .orWhere("article.writerName like :writerName", { writerName: `%${content}%` })
                    .orWhere("article.summary like :writerName", { writerName: `%${content}%` })
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
        if (startDate) {
            qb = qb.andWhere("article.startDate >= :startDate", { startDate });
        }
        if (endDate) {
            qb = qb.andWhere("article.endDate <= :endDate", { endDate });
        }
        const [data, totalCount] = await qb
            .skip(start || 0)
            .take(limit || 20)
            .getManyAndCount();
        await (0, likeScrapUtil_1.checkUserImageUrl)(data, this.userRepository);
        return { data, totalCount };
    }
    findOne(id) {
        return this.articleRepository.findOne({ where: { id } });
    }
    update(id, updateArticleDto) {
        return this.articleRepository.update(+id, updateArticleDto);
    }
    async remove(id) {
        await this.commentRepository.delete({
            articleId: id,
        });
        return this.articleRepository.delete(id);
    }
    async removeTransaction(id) {
        await this.uow.withTransaction(async () => {
            await this.commentRepository.delete({
                articleId: id,
            });
            await this.articleRepository.delete(id);
        });
    }
    async checkOwnership({ id, writerId }) {
        const article = await this.articleRepository.findOne({ where: { id } });
        return article.writerId === writerId;
    }
    async findAllByAdmin(query) {
        const { filter } = query;
        const qb = await this.articleRepository.createQueryBuilder("article");
        if (filter) {
            const typedFilter = (0, parseMethod_1.transFormFilter)(filter);
            typedFilter.map((item) => {
                const [property, method, value] = item.split(":");
                qb.andWhere(`article.${property} ${(0, parseMethod_1.transFormWhereClause)(method, value)}`);
            });
        }
        const [data, totalCount] = await qb.getManyAndCount();
        return { data, totalCount };
    }
    updateArticle(query) {
        if (!query.id) {
            return this.articleRepository.save(Object.assign({}, query));
        }
        else {
            return this.articleRepository.update(query.id, query);
        }
    }
    updateArticleByAdmin(query) {
        if (!query.id) {
            return this.articleRepository.save(Object.assign({}, query));
        }
        else {
            return this.articleRepository.update(query.id, query);
        }
    }
    removeByAdmin(query) {
        return this.articleRepository.delete(query.id);
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(1, (0, typeorm_1.InjectRepository)(article_comment_entity_1.ArticleComment)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        unit_of_work_provider_1.UnitOfWork,
        transactional_repository_1.TransactionalRepository])
], ArticleService);
//# sourceMappingURL=article.service.js.map