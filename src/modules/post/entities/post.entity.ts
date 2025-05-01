import { BaseModel } from "../../../common/entity/base.entity";
import { Category } from "../../category/entities/category.entity";
import { SubCategory } from "../../sub-category/entities/sub-category.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("post")
export class Post extends BaseModel {
  @Column({
    type: "text",
    name: "summary",
    nullable: false,
    comment: "요약",
  })
  summary: string;

  @Column({
    type: "varchar",
    length: 255,
    name: "title",
    nullable: false,
    comment: "제목",
  })
  title: string;

  @Column({
    type: "text",
    name: "content",
    nullable: false,
    comment: "내용",
  })
  content: string;

  @Column({
    type: "varchar",
    length: 255,
    name: "thumbnail",
    nullable: true,
    comment: "썸네일",
  })
  thumbnail: string;

  @Column({
    type: "varchar",
    length: 255,
    name: "reference_place",
    nullable: true,
    comment: "참조 장소",
  })
  referencePlace: string;

  @Column({
    type: "text",
    name: "images",
    nullable: true,
    comment: "이미지들",
  })
  images: string;

  @Column({
    type: "text",
    name: "attach_files",
    nullable: true,
    comment: "첨부파일들",
  })
  attachFiles: string;

  @Column({
    type: "bigint",
    name: "author_id",
    nullable: false,
    comment: "작성자 ID",
  })
  authorId: number;

  @Column({
    type: "int",
    name: "view_cnt",
    default: 0,
    comment: "조회수",
  })
  viewCnt: number;

  @Column({
    type: "bigint",
    name: "subcategory_id",
    nullable: true,
    comment: "서브카테고리 ID",
  })
  subcategoryId: number;

  @Column({
    type: "bigint",
    name: "category_id",
    nullable: false,
    comment: "카테고리 ID",
  })
  categoryId: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "author_id" })
  author: User;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.posts, { onDelete: "SET NULL" })
  @JoinColumn({ name: "subcategory_id" })
  subcategory: SubCategory;

  @ManyToOne(() => Category, (category) => category.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;
}
