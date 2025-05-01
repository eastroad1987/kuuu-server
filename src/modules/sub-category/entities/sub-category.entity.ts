import { BaseModel } from "../../../common/entity/base.entity";
import { YnEnums } from "../../../common/constants/YnEnums";
import { Category } from "../../category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Post } from "../../post/entities/post.entity";

@Entity("sub_category")
export class SubCategory extends BaseModel {
  @Column({
    type: "varchar",
    length: 255,
    name: "title",
    nullable: true,
    comment: "서브 카테고리 제목",
  })
  title: string;

  @Column({
    type: "enum",
    name: "anonymous_yn",
    enum: YnEnums,
    comment: "익명 여부",
  })
  anonymousYn: YnEnums;

  @Column("enum", {
    name: "title_yn",
    enum: YnEnums,
    comment: "제목 사용 여부",
  })
  titleYn: YnEnums;

  @Column("enum", {
    name: "content_yn",
    enum: YnEnums,
    comment: "내용 사용 여부",
  })
  contentYn: YnEnums;

  @Column("enum", {
    name: "thumbnail_yn",
    enum: YnEnums,
    comment: "썸네일 사용 여부",
  })
  thumbnailYn: YnEnums;

  @Column("enum", {
    name: "reference_place_yn",
    enum: YnEnums,
    comment: "참조 장소 사용 여부",
  })
  referencePlaceYn: YnEnums;

  @Column("enum", {
    name: "secret_yn",
    enum: YnEnums,
    comment: "비밀글 사용 여부",
  })
  secretYn: YnEnums;

  @Column("enum", {
    name: "images_yn",
    enum: YnEnums,
    comment: "이미지 사용 여부",
  })
  imagesYn: YnEnums;

  @Column("enum", {
    name: "attach_files_yn",
    enum: YnEnums,
    comment: "첨부파일 사용 여부",
  })
  attachFilesYn: YnEnums;

  @Column("enum", {
    name: "comment_yn",
    enum: YnEnums,
    comment: "댓글 사용 여부",
  })
  commentYn: YnEnums;

  @Column("enum", {
    name: "view_cnt_yn",
    enum: YnEnums,
    comment: "조회수 사용 여부",
  })
  viewCntYn: YnEnums;

  @Column("bigint", { name: "category_id" })
  categoryId: number;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => Post, (post) => post.subcategory)
  posts: Post[];
}
