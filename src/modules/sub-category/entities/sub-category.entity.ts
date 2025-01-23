import { BaseModel } from "common/entity/base.entity";
import { YnEnums } from "common/constants/YnEnums";
import { Category } from "modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { KuuuTableEnums, SubCategoryEnums } from "common/constants/KuuuTableEnums";

@Entity(KuuuTableEnums.SUBCATEGORY)
export class SubCategory extends BaseModel {
  @Column("varchar", {
    name: SubCategoryEnums.TITLE,
    length: 255,
    nullable: true,
    comment: "서브 카테고리 제목",
  })
  title: string;

  @Column("enum", {
    name: SubCategoryEnums.ANONYMOUS_YN,
    enum: YnEnums,
    comment: "익명 여부",
  })
  anonymousYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.TITLE_YN,
    enum: YnEnums,
    comment: "제목 사용 여부",
  })
  titleYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.CONTENT_YN,
    enum: YnEnums,
    comment: "내용 사용 여부",
  })
  contentYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.THUMBNAIL_YN,
    enum: YnEnums,
    comment: "썸네일 사용 여부",
  })
  thumbnailYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.REFERENCE_PLACE_YN,
    enum: YnEnums,
    comment: "참조 장소 사용 여부",
  })
  referencePlaceYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.SECRET_YN,
    enum: YnEnums,
    comment: "비밀글 사용 여부",
  })
  secretYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.IMAGES_YN,
    enum: YnEnums,
    comment: "이미지 사용 여부",
  })
  imagesYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.ATTACH_FILES_YN,
    enum: YnEnums,
    comment: "첨부파일 사용 여부",
  })
  attachFilesYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.COMMENT_YN,
    enum: YnEnums,
    comment: "댓글 사용 여부",
  })
  commentYn: YnEnums;

  @Column("enum", {
    name: SubCategoryEnums.VIEW_CNT_YN,
    enum: YnEnums,
    comment: "조회수 사용 여부",
  })
  viewCntYn: YnEnums;

  @Column("bigint", { name: SubCategoryEnums.CATEGORY_ID })
  categoryId: number;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: SubCategoryEnums.CATEGORY_ID })
  category: Category;
}
