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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        const category = await this.categoryRepository.findOne({
            where: { title: createCategoryDto.title },
        });
        if (category) {
            throw new Error("Category with this title already exists");
        }
        return this.categoryRepository.save(createCategoryDto);
    }
    async findAll(query) {
        let qb = this.categoryRepository
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.subcategories", "subcategories");
        if (query.title) {
            qb = qb.andWhere("category.title LIKE :title", { title: `%${query.title}%` });
        }
        if (query.sort) {
            const [field, order] = query.sort.split(":");
            qb = qb.orderBy(`category.${field}`, order);
        }
        else {
            qb = qb.orderBy("category.createdAt", "DESC");
        }
        const [data, totalCount] = await qb
            .skip(query.start || 0)
            .take(query.limit || 20)
            .getManyAndCount();
        return { data, totalCount };
    }
    async findCategories() {
        return this.categoryRepository.find({
            relations: ["subcategories"],
        });
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ["subcategories"],
        });
        if (!category) {
            throw new common_1.NotFoundException("Category not found");
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException("Category not found");
        }
        if (updateCategoryDto.title) {
            const existingCategory = await this.categoryRepository.findOne({
                where: { title: updateCategoryDto.title },
            });
            if (existingCategory && existingCategory.id !== id) {
                throw new Error("Category with this title already exists");
            }
        }
        await this.categoryRepository.update(id, updateCategoryDto);
        return this.findOne(id);
    }
    async remove(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException("Category not found");
        }
        return this.categoryRepository.delete(id);
    }
    async findByTitle(title) {
        return this.categoryRepository.findOne({ where: { title } });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
