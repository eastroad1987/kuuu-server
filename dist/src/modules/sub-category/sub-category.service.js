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
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../category/entities/category.entity");
const sub_category_entity_1 = require("./entities/sub-category.entity");
const post_entity_1 = require("../post/entities/post.entity");
let SubCategoryService = class SubCategoryService {
    constructor(subCategoryRepository, categoryRepository, postRepository) {
        this.subCategoryRepository = subCategoryRepository;
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
    }
    async create(createSubCategoryDto) {
        const category = await this.categoryRepository.findOne({
            where: { id: createSubCategoryDto.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException("Category not found");
        }
        return this.subCategoryRepository.save(createSubCategoryDto);
    }
    async findAll(query) {
        let qb = this.subCategoryRepository
            .createQueryBuilder("subcategory")
            .leftJoinAndSelect("subcategory.category", "category");
        if (query.title) {
            qb = qb.andWhere("subcategory.title LIKE :title", { title: `%${query.title}%` });
        }
        if (query.categoryId) {
            qb = qb.andWhere("subcategory.categoryId = :categoryId", { categoryId: query.categoryId });
        }
        const [data, totalCount] = await qb
            .skip(query.start || 0)
            .take(query.limit || 20)
            .getManyAndCount();
        return { data, totalCount };
    }
    async findPostsBySubCategoryId(subcategoryId, query) {
        let qb = this.postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.category", "category")
            .leftJoinAndSelect("post.subcategory", "subcategory")
            .where("post.subcategoryId = :subcategoryId", { subcategoryId });
        if (query.title) {
            qb = qb.andWhere("post.title LIKE :title", { title: `%${query.title}%` });
        }
        if (query.categoryId) {
            qb = qb.andWhere("post.categoryId = :categoryId", { categoryId: query.categoryId });
        }
        const [data, totalCount] = await qb
            .skip(query.start || 0)
            .take(query.limit || 20)
            .orderBy("post.createdAt", "DESC")
            .getManyAndCount();
        return { data, totalCount };
    }
    async findOne(id) {
        const subcategory = await this.subCategoryRepository.findOne({
            where: { id },
            relations: ["category"],
        });
        if (!subcategory) {
            throw new common_1.NotFoundException("SubCategory not found");
        }
        return subcategory;
    }
    async update(id, updateSubCategoryDto) {
        const subcategory = await this.subCategoryRepository.findOne({ where: { id } });
        if (!subcategory) {
            throw new common_1.NotFoundException("SubCategory not found");
        }
        return this.subCategoryRepository.update(id, updateSubCategoryDto);
    }
    async remove(id) {
        const subcategory = await this.subCategoryRepository.findOne({ where: { id } });
        if (!subcategory) {
            throw new common_1.NotFoundException("SubCategory not found");
        }
        return this.subCategoryRepository.delete(id);
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sub_category_entity_1.SubCategory)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SubCategoryService);
