import { Repository } from "typeorm";
import { Post } from "../post/entities/post.entity";
import { User } from "../user/entities/user.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetCommentDto } from "./dto/get-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";
export declare class CommentService {
    private commentRepository;
    private postRepository;
    private userRepository;
    constructor(commentRepository: Repository<Comment>, postRepository: Repository<Post>, userRepository: Repository<User>);
    create(createCommentDto: CreateCommentDto, userId: number): Promise<{
        authorId: number;
        writeName: string;
        postId: number;
        content: string;
        filePath?: string;
        parentCommentId?: number;
    } & Comment>;
    findAll(query: GetCommentDto): Promise<{
        data: Comment[];
        totalCount: number;
    }>;
    findOne(id: number): Promise<Comment>;
    update(id: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
