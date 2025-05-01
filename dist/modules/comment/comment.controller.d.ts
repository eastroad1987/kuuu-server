import { User } from "../user/entities/user.entity";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetCommentDto } from "./dto/get-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, user: User): Promise<{
        authorId: number;
        writeName: string;
        postId: number;
        content: string;
        filePath?: string;
        parentCommentId?: number;
    } & import("./entities/comment.entity").Comment>;
    findAll(query: GetCommentDto): Promise<{
        data: import("./entities/comment.entity").Comment[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./entities/comment.entity").Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto, user: User): Promise<import("typeorm").UpdateResult>;
    remove(id: string, user: User): Promise<import("typeorm").DeleteResult>;
}
