import { BaseModel } from "common/entity/base.entity";
import { ArticleComment } from "modules/article-comment/entities/article-comment.entity";
import { Board } from "modules/board/entities/board.entity";
export declare class Article extends BaseModel {
    writerId: number | null;
    writerName: string | null;
    title: string | null;
    content: string | null;
    summary: string | null;
    thumbnail: object | null;
    referencePlace: object | null;
    attachFiles: object | null;
    images: object | null;
    viewCnt: number | null;
    boardId: number;
    board: Board;
    comments: ArticleComment[];
}
