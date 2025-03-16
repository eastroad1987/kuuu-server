import { Repository } from "typeorm";
import { Category } from "../category/entities/category.entity";
import { SubCategory } from "../sub-category/entities/sub-category.entity";
import { User } from "../user/entities/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostDto } from "./dto/get-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";
export declare class PostService {
    private postRepository;
    private categoryRepository;
    private subCategoryRepository;
    private userRepository;
    constructor(postRepository: Repository<Post>, categoryRepository: Repository<Category>, subCategoryRepository: Repository<SubCategory>, userRepository: Repository<User>);
    create(createPostDto: CreatePostDto, userId: number): Promise<{
        authorId: number;
        title: string;
        content: string;
        summary?: string;
        thumbnail?: string;
        referencePlace?: string;
        images?: string;
        attachFiles?: string;
        categoryId: number;
        subcategoryId?: number;
    } & Post>;
    findAll(query: GetPostDto): Promise<{
        data: Post[];
        totalCount: number;
    }>;
    findOne(id: number): Promise<Post>;
    findPostsByMonth(): Promise<Post[]>;
    update(id: number, updatePostDto: UpdatePostDto, userId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
    increaseViewCount(id: number): Promise<import("typeorm").UpdateResult>;
}
