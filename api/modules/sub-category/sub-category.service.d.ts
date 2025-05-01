import { Repository } from "typeorm";
import { Category } from "../category/entities/category.entity";
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { GetSubCategoryDto } from "./dto/get-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import { SubCategory } from "./entities/sub-category.entity";
import { Post } from "../post/entities/post.entity";
export declare class SubCategoryService {
    private subCategoryRepository;
    private categoryRepository;
    private postRepository;
    constructor(subCategoryRepository: Repository<SubCategory>, categoryRepository: Repository<Category>, postRepository: Repository<Post>);
    create(createSubCategoryDto: CreateSubCategoryDto): Promise<CreateSubCategoryDto & SubCategory>;
    findAll(query: GetSubCategoryDto): Promise<{
        data: SubCategory[];
        totalCount: number;
    }>;
    findPostsBySubCategoryId(subcategoryId: number, query: GetSubCategoryDto): Promise<{
        data: Post[];
        totalCount: number;
    }>;
    findOne(id: number): Promise<SubCategory>;
    update(id: number, updateSubCategoryDto: UpdateSubCategoryDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
