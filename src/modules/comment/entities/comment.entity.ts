import { CommentEnums, KuuuTableEnums } from "common/constants/KuuuTableEnums";
import { BaseModel } from "common/entity/base.entity";
import { Post } from "modules/post/entities/post.entity";
import { User } from "modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity(KuuuTableEnums.COMMENT)
export class Comment extends BaseModel {
  @Column("bigint", {
    name: CommentEnums.POST_ID,
    nullable: false,
    comment: "게시글 ID",
  })
  postId: number;

  @Column("bigint", {
    name: CommentEnums.AUTHOR_ID,
    nullable: false,
    comment: "작성자 ID",
  })
  authorId: number;

  @Column("text", {
    name: CommentEnums.CONTENT,
    nullable: false,
    comment: "댓글 내용",
  })
  content: string;

  @Column("varchar", {
    name: CommentEnums.WRITE_NAME,
    length: 255,
    nullable: false,
    comment: "작성자 이름",
  })
  writeName: string;

  @Column("varchar", {
    name: CommentEnums.FILE_PATH,
    length: 255,
    nullable: true,
    comment: "파일 경로",
  })
  filePath: string;

  @Column("bigint", {
    name: CommentEnums.PARENT_COMMENT_ID,
    nullable: true,
    comment: "부모 댓글 ID",
  })
  parentCommentId: number;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: CommentEnums.POST_ID })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: CommentEnums.AUTHOR_ID })
  author: User;

  @ManyToOne(() => Comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: CommentEnums.PARENT_COMMENT_ID })
  parentComment: Comment;
}
