import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { ArticleCommentEnums, KuuuTableEnums } from "common/constants/KuuuTableEnums";
import { BaseModel } from "common/entity/base.entity";
import { Article } from "modules/article/entities/article.entity";

@Entity(KuuuTableEnums.ARTICLE_COMMENT)
export class ArticleComment extends BaseModel {
  @Column("int", {
    name: ArticleCommentEnums.WRITER_ID,
    nullable: true,
    comment: "작성자아이디",
  })
  writerId: number | null;

  @Column("varchar", {
    name: ArticleCommentEnums.WRITER_NAME,
    nullable: true,
    comment: "작성자명",
    length: 250,
  })
  writerName: string | null;

  @Column("varchar", {
    name: ArticleCommentEnums.COMMENT,
    nullable: true,
    comment: "내용",
    length: 5000,
  })
  comment: string | null;

  @Column("varchar", {
    name: ArticleCommentEnums.FILE_PATH,
    nullable: true,
    comment: "파일이나 이미지",
    length: 500,
  })
  filePath: string | null;

  @Column("int", { name: ArticleCommentEnums.ARTICLE_ID, comment: "글 아이디" })
  articleId: number;

  @ManyToOne(() => Article, (article) => article.comments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: ArticleCommentEnums.ARTICLE_ID, referencedColumnName: ArticleCommentEnums.ID },
  ])
  article: Article;
}
