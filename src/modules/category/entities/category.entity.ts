import { BaseModel } from "../../../common/entity/base.entity";
import { SubCategory } from "../../../modules/sub-category/entities/sub-category.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Post } from "../../post/entities/post.entity";

@Entity("category")
export class Category extends BaseModel {
  @Column("varchar", {
    name: "title",
    length: 255,
    nullable: false,
    unique: true,
    comment: "카테고리 제목",
  })
  title: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subcategories: SubCategory[];

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
