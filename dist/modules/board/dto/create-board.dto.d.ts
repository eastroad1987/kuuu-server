import { BoardTypeEnums } from "common/constants/BoardTypeEnums";
export declare class CreateBoardDto {
    id?: number;
    boardName: string;
    boardType: BoardTypeEnums;
    anonymousYn: string;
    titleYn: string;
    contentYn: string;
    thumbnailYn: string;
    referencePlaceYn: string;
    secretYn: string;
    imagesYn: string;
    attachFilesYn: string;
    commentYn: string;
    viewCntYn: string;
    likeYn: string;
}
