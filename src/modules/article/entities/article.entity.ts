import { ArticleEnums, KuuuTableEnums } from "common/constants/KuuuTableEnums";
import { BaseModel } from "common/entity/base.entity";
import { ArticleComment } from "modules/article-comment/entities/article-comment.entity";
import { Board } from "modules/board/entities/board.entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";

@Entity(KuuuTableEnums.ARTICLE)
export class Article extends BaseModel {
  @Column("int", {
    name: ArticleEnums.WRITER_ID,
    nullable: false,
    comment: "작성자 아이디",
  })
  writerId: number | null;

  @Column("varchar", {
    name: ArticleEnums.WRITER_NAME,
    nullable: true,
    comment: "작성자명",
    length: 250,
  })
  writerName: string | null;

  @Column("varchar", {
    name: ArticleEnums.TITLE,
    nullable: true,
    comment: "제목",
    length: 250,
  })
  title: string | null;

  @Column("varchar", {
    name: ArticleEnums.CONTENT,
    nullable: true,
    comment: "내용",
    length: 5000,
  })
  content: string | null;

  @Column("varchar", {
    name: ArticleEnums.SUMMARY,
    nullable: true,
    comment: "내용",
    length: 1000,
  })
  summary: string | null;

  @Column("json", {
    name: ArticleEnums.THUMBNAIL,
    nullable: true,
    comment: "썸네일주소",
  })
  thumbnail: object | null;

  @Column("json", {
    name: ArticleEnums.REFERENCE_PLACE,
    nullable: true,
    comment: "참조장소",
  })
  referencePlace: object | null;

  @Column("json", { name: ArticleEnums.ATTACH_FILES, nullable: true, comment: "첨부파일" })
  attachFiles: object | null;

  @Column("json", { name: ArticleEnums.IMAGES, nullable: true, comment: "이미지들" })
  images: object | null;

  @Column("int", {
    name: ArticleEnums.VIEW_CNT,
    nullable: false,
    comment: "조회수",
    default: 0,
  })
  viewCnt: number | null;

  @Column("int", { name: ArticleEnums.BOARD_ID, comment: "게시판타입아이디" })
  boardId: number;

  @JoinColumn([{ name: ArticleEnums.BOARD_ID, referencedColumnName: ArticleEnums.BOARD_ID }])
  board: Board;

  @OneToMany(() => ArticleComment, (comment) => comment.article)
  comments: ArticleComment[];
}
