import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../category/entities/category.entity";
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { GetSubCategoryDto } from "./dto/get-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import { SubCategory } from "./entities/sub-category.entity";

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createSubCategoryDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return this.subCategoryRepository.save(createSubCategoryDto);
  }

  async findAll(query: GetSubCategoryDto) {
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

  async findOne(id: number) {
    const subcategory = await this.subCategoryRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!subcategory) {
      throw new NotFoundException("SubCategory not found");
    }
    return subcategory;
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subcategory = await this.subCategoryRepository.findOne({ where: { id } });
    if (!subcategory) {
      throw new NotFoundException("SubCategory not found");
    }
    return this.subCategoryRepository.update(id, updateSubCategoryDto);
  }

  async remove(id: number) {
    const subcategory = await this.subCategoryRepository.findOne({ where: { id } });
    if (!subcategory) {
      throw new NotFoundException("SubCategory not found");
    }
    return this.subCategoryRepository.delete(id);
  }
}
