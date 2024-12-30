import { ArticleService } from "modules/article/article.service";
import { BoardService } from "./board.service";
import { BaseGetDto } from "common/dto/base.dto";
import { GetArticlesByBoardDto } from "modules/article/dto/get-article.dto";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
export type GetBoardQuery = BaseGetDto;
export declare class BoardController {
    private readonly boardService;
    private readonly articleService;
    constructor(boardService: BoardService, articleService: ArticleService);
    getAll(): Promise<import("./entities/board.entity").Board[]>;
    findArticlesByBoard(query: GetArticlesByBoardDto): Promise<{
        data: import("../article/entities/article.entity").Article[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./entities/board.entity").Board[]>;
    createByAdmin(createBoardDto: CreateBoardDto): Promise<CreateBoardDto & import("./entities/board.entity").Board>;
    updateByAdmin(query: UpdateBoardDto): Promise<import("typeorm").UpdateResult | ({
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
    } & import("./entities/board.entity").Board)>;
    removeByAdmin(query: UpdateBoardDto): Promise<import("typeorm").DeleteResult>;
}
