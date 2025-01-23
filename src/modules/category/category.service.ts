import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoryDto } from "./dto/get-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { title: createCategoryDto.title },
    });

    if (category) {
      throw new Error("Category with this title already exists");
    }

    return this.categoryRepository.save(createCategoryDto);
  }

  async findAll(query: GetCategoryDto) {
    let qb = this.categoryRepository
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.subcategories", "subcategories");

    if (query.title) {
      qb = qb.andWhere("category.title LIKE :title", { title: `%${query.title}%` });
    }

    if (query.sort) {
      const [field, order] = query.sort.split(":");
      qb = qb.orderBy(`category.${field}`, order as "ASC" | "DESC");
    } else {
      qb = qb.orderBy("category.createdAt", "DESC");
    }

    const [data, totalCount] = await qb
      .skip(query.start || 0)
      .take(query.limit || 20)
      .getManyAndCount();

    return { data, totalCount };
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ["subcategories"],
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException("Category not found");
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

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return this.categoryRepository.delete(id);
  }

  async findByTitle(title: string) {
    return this.categoryRepository.findOne({ where: { title } });
  }
}
