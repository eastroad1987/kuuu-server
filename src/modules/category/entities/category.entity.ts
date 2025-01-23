import { CategoryEnums, KuuuTableEnums } from "common/constants/KuuuTableEnums";
import { BaseModel } from "common/entity/base.entity";
import { SubCategory } from "modules/sub-category/entities/sub-category.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity(KuuuTableEnums.CATEGORY)
export class Category extends BaseModel {
  @Column("varchar", {
    name: CategoryEnums.TITLE,
    length: 255,
    nullable: false,
    unique: true,
    comment: "카테고리 제목",
  })
  title: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subcategories: SubCategory[];
}
