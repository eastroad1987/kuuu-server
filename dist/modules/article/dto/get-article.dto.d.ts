import { BaseGetDto } from "common/dto/base.dto";
export declare class GetArticleDto extends BaseGetDto {
    id: number;
    title: string;
    content: string;
    boardId: number;
}
export declare class GetArticlesByBoardDto extends BaseGetDto {
    readonly id: number;
    title: string;
    content: string;
}
export declare class GetCommentsByArticleDto extends BaseGetDto {
    readonly id: number;
}
