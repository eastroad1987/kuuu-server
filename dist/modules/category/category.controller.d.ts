import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoryDto } from "./dto/get-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto & import("./entities/category.entity").Category>;
    findAll(query: GetCategoryDto): Promise<{
        data: import("./entities/category.entity").Category[];
        totalCount: number;
    }>;
    findCategories(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: string): Promise<import("./entities/category.entity").Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
