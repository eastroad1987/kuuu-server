import { BaseModel } from "common/entity/base.entity";
import { Post } from "modules/post/entities/post.entity";
import { User } from "modules/user/entities/user.entity";
export declare class Comment extends BaseModel {
    postId: number;
    authorId: number;
    content: string;
    writeName: string;
    filePath: string;
    parentCommentId: number;
    post: Post;
    author: User;
    parentComment: Comment;
}
