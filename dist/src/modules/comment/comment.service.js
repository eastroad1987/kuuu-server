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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../post/entities/post.entity");
const user_entity_1 = require("../user/entities/user.entity");
const comment_entity_1 = require("./entities/comment.entity");
let CommentService = class CommentService {
    constructor(commentRepository, postRepository, userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async create(createCommentDto, userId) {
        const post = await this.postRepository.findOne({
            where: { id: createCommentDto.postId },
        });
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (createCommentDto.parentCommentId) {
            const parentComment = await this.commentRepository.findOne({
                where: { id: createCommentDto.parentCommentId },
            });
            if (!parentComment) {
                throw new common_1.NotFoundException("Parent comment not found");
            }
        }
        return this.commentRepository.save(Object.assign(Object.assign({}, createCommentDto), { authorId: userId, writeName: user.name }));
    }
    async findAll(query) {
        let qb = this.commentRepository
            .createQueryBuilder("comment")
            .leftJoinAndSelect("comment.author", "author")
            .leftJoinAndSelect("comment.post", "post")
            .leftJoinAndSelect("comment.parentComment", "parentComment");
        if (query.postId) {
            qb = qb.andWhere("comment.postId = :postId", { postId: query.postId });
        }
        if (query.authorId) {
            qb = qb.andWhere("comment.authorId = :authorId", { authorId: query.authorId });
        }
        if (query.content) {
            qb = qb.andWhere("comment.content LIKE :content", { content: `%${query.content}%` });
        }
        if (query.sort) {
            const [field, order] = query.sort.split(":");
            qb = qb.orderBy(`comment.${field}`, order);
        }
        else {
            qb = qb.orderBy("comment.createdAt", "DESC");
        }
        const [data, totalCount] = await qb
            .skip(query.start || 0)
            .take(query.limit || 20)
            .getManyAndCount();
        return { data, totalCount };
    }
    async findOne(id) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ["author", "post", "parentComment"],
        });
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        return comment;
    }
    async update(id, updateCommentDto, userId) {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        if (comment.authorId !== userId) {
            throw new common_1.UnauthorizedException("You can only update your own comments");
        }
        return this.commentRepository.update(id, updateCommentDto);
    }
    async remove(id, userId) {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        if (comment.authorId !== userId) {
            throw new common_1.UnauthorizedException("You can only delete your own comments");
        }
        return this.commentRepository.delete(id);
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comment.service.js.map