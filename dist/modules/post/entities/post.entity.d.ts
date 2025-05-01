import { BaseModel } from "../../../common/entity/base.entity";
import { Category } from "../../category/entities/category.entity";
import { SubCategory } from "../../sub-category/entities/sub-category.entity";
import { User } from "../../user/entities/user.entity";
export declare class Post extends BaseModel {
    summary: string;
    title: string;
    content: string;
    thumbnail: string;
    referencePlace: string;
    images: string;
    attachFiles: string;
    authorId: number;
    viewCnt: number;
    subcategoryId: number;
    categoryId: number;
    author: User;
    subcategory: SubCategory;
    category: Category;
}
