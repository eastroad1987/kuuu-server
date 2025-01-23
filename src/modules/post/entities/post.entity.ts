import { KuuuTableEnums, PostEnums } from "common/constants/KuuuTableEnums";
import { BaseModel } from "common/entity/base.entity";
import { Category } from "modules/category/entities/category.entity";
import { SubCategory } from "modules/sub-category/entities/sub-category.entity";
import { User } from "modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity(KuuuTableEnums.POST)
export class Post extends BaseModel {
  @Column("text", {
    name: PostEnums.SUMMARY,
    nullable: false,
    comment: "요약",
  })
  summary: string;

  @Column("varchar", {
    name: PostEnums.TITLE,
    length: 255,
    nullable: false,
    comment: "제목",
  })
  title: string;

  @Column("text", {
    name: PostEnums.CONTENT,
    nullable: false,
    comment: "내용",
  })
  content: string;

  @Column("varchar", {
    name: PostEnums.THUMBNAIL,
    length: 255,
    nullable: true,
    comment: "썸네일",
  })
  thumbnail: string;

  @Column("varchar", {
    name: PostEnums.REFERENCE_PLACE,
    length: 255,
    nullable: true,
    comment: "참조 장소",
  })
  referencePlace: string;

  @Column("text", {
    name: PostEnums.IMAGES,
    nullable: true,
    comment: "이미지들",
  })
  images: string;

  @Column("text", {
    name: PostEnums.ATTACH_FILES,
    nullable: true,
    comment: "첨부파일들",
  })
  attachFiles: string;

  @Column("bigint", {
    name: PostEnums.AUTHOR_ID,
    nullable: false,
    comment: "작성자 ID",
  })
  authorId: number;

  @Column("int", {
    name: PostEnums.VIEW_CNT,
    default: 0,
    comment: "조회수",
  })
  viewCnt: number;

  @Column("bigint", {
    name: PostEnums.SUBCATEGORY_ID,
    nullable: true,
    comment: "서브카테고리 ID",
  })
  subcategoryId: number;

  @Column("bigint", {
    name: PostEnums.CATEGORY_ID,
    nullable: false,
    comment: "카테고리 ID",
  })
  categoryId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: PostEnums.AUTHOR_ID })
  author: User;

  @ManyToOne(() => SubCategory, { onDelete: "SET NULL" })
  @JoinColumn({ name: PostEnums.SUBCATEGORY_ID })
  subcategory: SubCategory;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: PostEnums.CATEGORY_ID })
  category: Category;
}
