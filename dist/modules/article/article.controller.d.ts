import { ArticleCommentService } from "modules/article-comment/article-comment.service";
import { User } from "modules/user/entities/user.entity";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { GetArticleDto, GetArticlesByBoardDto } from "./dto/get-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
export declare class ArticleController {
    private readonly articleService;
    private readonly articleCommentService;
    constructor(articleService: ArticleService, articleCommentService: ArticleCommentService);
    findAllByAdmin(query: GetArticleDto): Promise<{
        data: import("./entities/article.entity").Article[];
        totalCount: number;
    }>;
    createArticle(createArticleDto: CreateArticleDto, user: User): Promise<import("typeorm").UpdateResult> | Promise<{
        id?: number | null;
        boardId?: number;
        writerId?: number | null;
        writerName?: string | null;
        title?: string | null;
        content?: string | null;
        summary?: string | null;
        thumbnail?: object | null;
        images?: object | null;
        referencePlace?: object | null;
        attachFiles?: object | null;
        viewCnt?: number | null;
    } & import("./entities/article.entity").Article>;
    removeByAdmin(query: UpdateArticleDto): Promise<import("typeorm").DeleteResult>;
    findArticleByBoardId(getArticlesByBoard: GetArticlesByBoardDto): Promise<{
        data: import("./entities/article.entity").Article[];
        totalCount: number;
    }>;
    findArticle(id: number, query: GetArticleDto): Promise<import("./entities/article.entity").Article>;
    increaseViewCnt(id: string): Promise<void>;
    updateArticle(id: number, user: User, updateArticleDto: UpdateArticleDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number, user: User): Promise<import("typeorm").DeleteResult>;
}
