import { Repository } from "typeorm";
import { ArticleComment } from "../article-comment/entities/article-comment.entity";
import { CreateArticleDto } from "./dto/create-article.dto";
import { GetArticleDto, GetArticlesByBoardDto } from "./dto/get-article.dto";
import { Article } from "./entities/article.entity";
import { TransactionalRepository } from "common/unit-of-work/transactional.repository";
import { UnitOfWork } from "common/unit-of-work/unit-of-work.provider";
import { User } from "modules/user/entities/user.entity";
import { UpdateArticleDto } from "./dto/update-article.dto";
export declare class ArticleService {
    private articleRepository;
    private commentRepository;
    private userRepository;
    private uow;
    protected repository: TransactionalRepository;
    constructor(articleRepository: Repository<Article>, commentRepository: Repository<ArticleComment>, userRepository: Repository<User>, uow: UnitOfWork, repository: TransactionalRepository);
    create(createArticleDto: CreateArticleDto): Promise<{
        id: number | null;
        boardId: number;
        writerId: number | null;
        writerName: string | null;
        title: string | null;
        content: string | null;
        summary: string | null;
        thumbnail: object | null;
        images: object | null;
        referencePlace: object | null;
        attachFiles: object | null;
        viewCnt: number | null;
    } & Article>;
    findArticleById(id: number, getArticleDto: GetArticleDto): Promise<Article>;
    findArticlesByBoardId(getArticlesByBoard: GetArticlesByBoardDto): Promise<{
        data: Article[];
        totalCount: number;
    }>;
    increaseViewCount(id: number): Promise<void>;
    findAll({ endDate, limit, sort, start, startDate, title, content }: GetArticleDto): Promise<{
        data: Article[];
        totalCount: number;
    }>;
    findOne(id: number): Promise<Article>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeTransaction(id: number): Promise<void>;
    checkOwnership({ id, writerId }: {
        id: number;
        writerId: number;
    }): Promise<boolean>;
    findAllByAdmin(query: GetArticleDto): Promise<{
        data: Article[];
        totalCount: number;
    }>;
    updateArticle(query: UpdateArticleDto): Promise<import("typeorm").UpdateResult> | Promise<{
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
    } & Article>;
    updateArticleByAdmin(query: UpdateArticleDto): Promise<import("typeorm").UpdateResult> | Promise<{
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
    } & Article>;
    removeByAdmin(query: UpdateArticleDto): Promise<import("typeorm").DeleteResult>;
}
