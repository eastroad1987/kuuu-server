import { Repository } from "typeorm";
import { Article } from "modules/article/entities/article.entity";
import { CreateArticleCommentDto } from "./dto/create-article-comment.dto";
import { UpdateArticleCommentDto } from "./dto/update-article-comment.dto";
import { ArticleComment } from "./entities/article-comment.entity";
export declare class ArticleCommentService {
    private commentRepository;
    private articleRepository;
    constructor(commentRepository: Repository<ArticleComment>, articleRepository: Repository<Article>);
    create(createCommentDto: CreateArticleCommentDto): Promise<CreateArticleCommentDto & ArticleComment>;
    update(updateCommentDto: UpdateArticleCommentDto): Promise<import("typeorm").UpdateResult>;
    remove(updateCommentDto: UpdateArticleCommentDto): Promise<import("typeorm").DeleteResult>;
    findCommentsByArticle(articleId: number): Promise<Article>;
}
