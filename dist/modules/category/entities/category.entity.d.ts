import { BaseModel } from "common/entity/base.entity";
import { SubCategory } from "modules/sub-category/entities/sub-category.entity";
export declare class Category extends BaseModel {
    title: string;
    subcategories: SubCategory[];
}
