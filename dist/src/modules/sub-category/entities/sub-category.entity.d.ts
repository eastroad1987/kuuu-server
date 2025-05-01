import { BaseModel } from "../../../common/entity/base.entity";
import { YnEnums } from "../../../common/constants/YnEnums";
import { Category } from "../../category/entities/category.entity";
export declare class SubCategory extends BaseModel {
    title: string;
    anonymousYn: YnEnums;
    titleYn: YnEnums;
    contentYn: YnEnums;
    thumbnailYn: YnEnums;
    referencePlaceYn: YnEnums;
    secretYn: YnEnums;
    imagesYn: YnEnums;
    attachFilesYn: YnEnums;
    commentYn: YnEnums;
    viewCntYn: YnEnums;
    categoryId: number;
    category: Category;
}
