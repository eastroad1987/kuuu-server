import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { GetSubCategoryDto } from "./dto/get-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import { SubCategoryService } from "./sub-category.service";
export declare class SubCategoryController {
    private readonly subCategoryService;
    constructor(subCategoryService: SubCategoryService);
    create(createSubCategoryDto: CreateSubCategoryDto): Promise<CreateSubCategoryDto & import("./entities/sub-category.entity").SubCategory>;
    findAll(query: GetSubCategoryDto): Promise<{
        data: import("./entities/sub-category.entity").SubCategory[];
        totalCount: number;
    }>;
    findPostsBySubCategoryId(id: string, query: GetSubCategoryDto): Promise<{
        data: import("../post/entities/post.entity").Post[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./entities/sub-category.entity").SubCategory>;
    update(id: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
