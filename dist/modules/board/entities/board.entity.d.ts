import { BoardTypeEnums } from "common/constants/BoardTypeEnums";
import { BaseModel } from "common/entity/base.entity";
import { Article } from "modules/article/entities/article.entity";
export declare class Board extends BaseModel {
    boardName: string | null;
    boardType: BoardTypeEnums | null;
    anonymousYn: string | null;
    titleYn: string | null;
    contentYn: string | null;
    thumbnailYn: string | null;
    referencePlaceYn: string | null;
    secretYn: string | null;
    imagesYn: string | null;
    attachFilesYn: string | null;
    commentYn: string | null;
    viewCntYn: string | null;
    articles: Article[];
}
