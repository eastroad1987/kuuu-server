import { User } from "../user/entities/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostDto } from "./dto/get-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostService } from "./post.service";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, user: User): Promise<{
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
    } & import("./entities/post.entity").Post>;
    findAll(query: GetPostDto): Promise<{
        data: import("./entities/post.entity").Post[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    findPostsByMonth(): Promise<import("./entities/post.entity").Post[]>;
    update(id: string, updatePostDto: UpdatePostDto, user: User): Promise<import("typeorm").UpdateResult>;
    remove(id: string, user: User): Promise<import("typeorm").DeleteResult>;
}
