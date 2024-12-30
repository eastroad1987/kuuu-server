import { ArticleCommentService } from "./article-comment.service";
import { CreateArticleCommentDto } from "./dto/create-article-comment.dto";
import { UpdateArticleCommentDto } from "./dto/update-article-comment.dto";
export declare class ArticleCommentController {
    private readonly commentService;
    constructor(commentService: ArticleCommentService);
    create(createArticleDto: CreateArticleCommentDto): Promise<CreateArticleCommentDto & import("./entities/article-comment.entity").ArticleComment>;
    update(updateCommentDto: UpdateArticleCommentDto): Promise<import("typeorm").UpdateResult>;
    remove(updateCommentDto: UpdateArticleCommentDto): Promise<import("typeorm").DeleteResult>;
    findCommentsByArticle(articleId: number): Promise<import("../article/entities/article.entity").Article>;
}
