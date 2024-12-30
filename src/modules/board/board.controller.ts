import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ArticleService } from "modules/article/article.service";
import { BoardService } from "./board.service";

import { JwtAuthGuard } from "auth/strategy/jwt-auth.guard";
import { BaseGetDto } from "common/dto/base.dto";
import { GetArticlesByBoardDto } from "modules/article/dto/get-article.dto";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

// type GetArticlesParams = Omit<GetArticlesByBoardsDto, "id">;

export type GetBoardQuery = BaseGetDto;

@ApiTags("[Service / Admin] 게시판")
@Controller("board")
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly articleService: ArticleService
  ) {}

  @Get("all")
  @ApiOperation({
    summary: "[서비스] 게시판 전체 목록(카테고리) 보기",
    description: "게시판 전체 목록(카테고리)을 제공한다",
  })
  getAll() {
    return this.boardService.findAll();
  }

  @Get()
  @ApiQuery({
    name: "start",
    required: false,
    type: Number,
    description: "페이지에 보여줄 게시물 시작 번호",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "한 페이지에 보여줄 게시물 수",
  })
  @ApiOperation({
    summary: "[서비스] 커뮤니티 게시물 목록 보기",
    description: "커뮤니티의 게시물 목록을 제공한다",
  })
  async findArticlesByBoard(@Query() query: GetArticlesByBoardDto) {
    return this.boardService.findArticlesByBoard(query);
  }

  @Get("admin/:id")
  @ApiParam({
    name: "id",
    description: "게시판 id, 1: 자유게시판, 2: QnA 게시판, 3: 로케이션 게시판, 4: 공지사항",
  })
  @ApiOperation({
    summary: "[서비스] 선택된 게시판 카테고리의 설정 상세 보기",
    description: "선택된 게시판의 상세보기를 제공한다",
  })
  findOne(@Param("id") id: string) {
    return this.boardService.findOne(+id);
  }

  @Post("admin")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "새로운 게시판(카테고리) 등록",
    description: "새로운 게시판(카테고리)을 등록한다",
  })
  @ApiBody({
    required: true,
    isArray: false,
    type: CreateBoardDto,
  })
  createByAdmin(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createByAdmin(createBoardDto);
  }

  @Patch("admin")
  async updateByAdmin(@Body() query: UpdateBoardDto) {
    return await this.boardService.updateByAdmin(query);
  }

  @Delete("admin")
  async removeByAdmin(@Body() query: UpdateBoardDto) {
    return await this.boardService.removeByAdmin(query);
  }
}
