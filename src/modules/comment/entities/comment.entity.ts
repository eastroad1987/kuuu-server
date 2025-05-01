import { BaseModel } from "../../../common/entity/base.entity";
import { Post } from "../../post/entities/post.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("comment")
export class Comment extends BaseModel {
  @Column("bigint", {
    name: "post_id",
    nullable: false,
    comment: "게시글 ID",
  })
  postId: number;

  @Column("bigint", {
    name: "author_id",
    nullable: false,
    comment: "작성자 ID",
  })
  authorId: number;

  @Column("text", {
    name: "content",
    nullable: false,
    comment: "댓글 내용",
  })
  content: string;

  @Column("varchar", {
    name: "write_name",
    length: 255,
    nullable: false,
    comment: "작성자 이름",
  })
  writeName: string;

  @Column("varchar", {
    name: "file_path",
    length: 255,
    nullable: true,
    comment: "파일 경로",
  })
  filePath: string;

  @Column("bigint", {
    name: "parent_comment_id",
    nullable: true,
    comment: "부모 댓글 ID",
  })
  parentCommentId: number;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: "author_id" })
  author: User;

  @ManyToOne(() => Comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_comment_id" })
  parentComment: Comment;
}
