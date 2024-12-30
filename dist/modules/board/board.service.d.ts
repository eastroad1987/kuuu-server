import { GetArticlesByBoardDto } from "modules/article/dto/get-article.dto";
import { Article } from "modules/article/entities/article.entity";
import { User } from "modules/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./entities/board.entity";
export declare class BoardService {
    private boardRepository;
    private articleRepository;
    private userRepository;
    constructor(boardRepository: Repository<Board>, articleRepository: Repository<Article>, userRepository: Repository<User>);
    findAll(): Promise<Board[]>;
    findOne(id: number): Promise<Board[]>;
    findArticlesByBoard(getArticlesByBoard: GetArticlesByBoardDto): Promise<{
        data: Article[];
        totalCount: number;
    }>;
    createByAdmin(createBoardDto: CreateBoardDto): Promise<CreateBoardDto & Board>;
    updateByAdmin(query: UpdateBoardDto): Promise<import("typeorm").UpdateResult> | Promise<{
        id?: number;
        boardName?: string;
        boardType?: import("../../common/constants/BoardTypeEnums").BoardTypeEnums;
        anonymousYn?: string;
        titleYn?: string;
        contentYn?: string;
        thumbnailYn?: string;
        referencePlaceYn?: string;
        secretYn?: string;
        imagesYn?: string;
        attachFilesYn?: string;
        commentYn?: string;
        viewCntYn?: string;
        likeYn?: string;
    } & Board>;
    removeByAdmin(query: UpdateBoardDto): Promise<import("typeorm").DeleteResult>;
}
