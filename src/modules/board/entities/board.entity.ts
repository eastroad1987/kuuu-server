import { BoardTypeEnums } from "common/constants/BoardTypeEnums";
import { BoardEnums, KuuuTableEnums } from "common/constants/KuuuTableEnums";
import { BaseModel } from "common/entity/base.entity";
import { Article } from "modules/article/entities/article.entity";

import { Column, Entity, OneToMany } from "typeorm";

@Entity(KuuuTableEnums.BOARD)
export class Board extends BaseModel {
  @Column("varchar", {
    name: BoardEnums.BOARD_NAME,
    nullable: true,
    comment: "게시판명",
    length: 255,
  })
  boardName: string | null;

  @Column("varchar", {
    name: BoardEnums.BOARD_TYPE,
    nullable: true,
    comment: "게시판 타입",
    length: 128,
  })
  boardType: BoardTypeEnums | null;

  @Column("varchar", {
    name: BoardEnums.ANONYMOUS_YN,
    nullable: true,
    comment: "익명포함여부",
    length: 1,
  })
  anonymousYn: string | null;

  @Column("varchar", {
    name: BoardEnums.TITLE_YN,
    nullable: true,
    comment: "제목포함여부",
    length: 1,
  })
  titleYn: string | null;

  @Column("varchar", {
    name: BoardEnums.CONTENT_YN,
    nullable: true,
    comment: "내용포함여부",
    length: 1,
  })
  contentYn: string | null;

  @Column("varchar", {
    name: BoardEnums.THUMBNAIL_YN,
    nullable: true,
    comment: "썸네일포함여부",
    length: 1,
  })
  thumbnailYn: string | null;

  @Column("varchar", {
    name: BoardEnums.REFERENCE_PLACE_YN,
    nullable: true,
    comment: "참조장소포함여부",
    length: 1,
  })
  referencePlaceYn: string | null;

  @Column("varchar", {
    name: BoardEnums.SECRET_YN,
    nullable: true,
    comment: "비밀글포함여부",
    length: 1,
  })
  secretYn: string | null;

  @Column("varchar", {
    name: BoardEnums.IMAGES_YN,
    nullable: true,
    comment: "이미지 포함여부",
    length: 1,
  })
  imagesYn: string | null;

  @Column("varchar", {
    name: BoardEnums.ATTACH_FILES_YN,
    nullable: true,
    comment: "첨부파일포함여부",
    length: 1,
  })
  attachFilesYn: string | null;

  @Column("varchar", {
    name: BoardEnums.COMMENT_YN,
    nullable: true,
    comment: "댓글여부",
    length: 1,
  })
  commentYn: string | null;

  @Column("varchar", {
    name: BoardEnums.VIEW_CNT_YN,
    nullable: true,
    comment: "조회수포함여부",
    length: 1,
  })
  viewCntYn: string | null;

  @OneToMany(() => Article, (article) => article.board)
  articles: Article[];
}
