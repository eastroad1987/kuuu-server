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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../category/entities/category.entity");
const sub_category_entity_1 = require("../sub-category/entities/sub-category.entity");
const user_entity_1 = require("../user/entities/user.entity");
const post_entity_1 = require("./entities/post.entity");
let PostService = class PostService {
    constructor(postRepository, categoryRepository, subCategoryRepository, userRepository) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.userRepository = userRepository;
    }
    async create(createPostDto, userId) {
        const category = await this.categoryRepository.findOne({
            where: { id: createPostDto.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException("Category not found");
        }
        if (createPostDto.subcategoryId) {
            const subcategory = await this.subCategoryRepository.findOne({
                where: { id: createPostDto.subcategoryId },
            });
            if (!subcategory) {
                throw new common_1.NotFoundException("SubCategory not found");
            }
        }
        return this.postRepository.save(Object.assign(Object.assign({}, createPostDto), { authorId: userId }));
    }
    async findAll(query) {
        let qb = this.postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.category", "category")
            .leftJoinAndSelect("post.subcategory", "subcategory");
        if (query.title) {
            qb = qb.andWhere("post.title LIKE :title", { title: `%${query.title}%` });
        }
        if (query.content) {
            qb = qb.andWhere("post.content LIKE :content", { content: `%${query.content}%` });
        }
        if (query.categoryId) {
            qb = qb.andWhere("post.categoryId = :categoryId", { categoryId: query.categoryId });
        }
        if (query.subcategoryId) {
            qb = qb.andWhere("post.subcategoryId = :subcategoryId", {
                subcategoryId: query.subcategoryId,
            });
        }
        if (query.sort) {
            const [field, order] = query.sort.split(":");
            qb = qb.orderBy(`post.${field}`, order);
        }
        else {
            qb = qb.orderBy("post.createdAt", "DESC");
        }
        const [data, totalCount] = await qb
            .skip(query.start || 0)
            .take(query.limit || 20)
            .getManyAndCount();
        console.log("[findAll] data:", data);
        console.log("[findAll] totalCount:", totalCount);
        return { data, totalCount };
    }
    async findOne(id) {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ["category", "subcategory"],
        });
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        return post;
    }
    async findPostsByMonth() {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        console.log("[findPostsByMonth] oneMonthAgo:");
        console.log(oneMonthAgo);
        const qb = this.postRepository
            .createQueryBuilder("posts")
            .leftJoinAndSelect("posts.category", "category")
            .leftJoinAndSelect("posts.subcategory", "subcategory")
            .where("posts.createdAt >= :oneMonthAgo", { oneMonthAgo })
            .orderBy("posts.createdAt", "DESC");
        return qb.getMany();
    }
    async update(id, updatePostDto, userId) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        if (post.authorId !== userId) {
            throw new common_1.UnauthorizedException("You can only update your own posts");
        }
        if (updatePostDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: updatePostDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException("Category not found");
            }
        }
        if (updatePostDto.subcategoryId) {
            const subcategory = await this.subCategoryRepository.findOne({
                where: { id: updatePostDto.subcategoryId },
            });
            if (!subcategory) {
                throw new common_1.NotFoundException("SubCategory not found");
            }
        }
        return this.postRepository.update(id, updatePostDto);
    }
    async remove(id, userId) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        if (post.authorId !== userId) {
            throw new common_1.UnauthorizedException("You can only delete your own posts");
        }
        return this.postRepository.delete(id);
    }
    async increaseViewCount(id) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        return this.postRepository.update(id, { viewCnt: post.viewCnt + 1 });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(sub_category_entity_1.SubCategory)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
