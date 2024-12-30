import { BaseModel } from "common/entity/base.entity";
import { Article } from "modules/article/entities/article.entity";
export declare class ArticleComment extends BaseModel {
    writerId: number | null;
    writerName: string | null;
    comment: string | null;
    filePath: string | null;
    articleId: number;
    article: Article;
}
