import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoryDto } from "./dto/get-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto & Category>;
    findAll(query: GetCategoryDto): Promise<{
        data: Category[];
        totalCount: number;
    }>;
    findCategories(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByTitle(title: string): Promise<Category>;
}
