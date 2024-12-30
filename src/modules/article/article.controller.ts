import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "auth/strategy/jwt-auth.guard";
import { UserDeco } from "common/decorator/user.decorator";
import { ArticleCommentService } from "modules/article-comment/article-comment.service";
import { User } from "modules/user/entities/user.entity";
import { ArticleService } from "./article.service";

import { CreateArticleDto } from "./dto/create-article.dto";
import { GetArticleDto, GetArticlesByBoardDto } from "./dto/get-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@ApiTags("[Service / Admin] 게시글")
@Controller("article")
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly articleCommentService: ArticleCommentService
  ) {}

  @Get("/admin")
  @ApiOperation({
    summary: "[서비스] 모든 게시판 게시글 조회",
    description: "모든 게시판의 게시글을 조회하며, 제목(title), 내용(content)으로 검색",
  })
  async findAllByAdmin(@Query() query: GetArticleDto) {
    return this.articleService.findAllByAdmin(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "[서비스] 게시물 생성",
    description: "게시물을 생성합니다",
  })
  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto, @UserDeco() user: User) {
    return this.articleService.updateArticle({ ...createArticleDto, writerId: user.id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete("/admin")
  removeByAdmin(@Query() query: UpdateArticleDto) {
    return this.articleService.removeByAdmin(query);
  }

  @Get()
  @ApiOperation({
    summary: "[서비스] 모든 게시판 게시글 조회",
    description: "모든 게시판의 게시글을 조회하며, 제목(title), 내용(content)으로 검색",
  })
  async findArticleByBoardId(@Body() getArticlesByBoard: GetArticlesByBoardDto) {
    return this.articleService.findArticlesByBoardId(getArticlesByBoard);
  }

  @Get(":id")
  @ApiOperation({
    summary: "[서비스] 모든 게시판 게시글 조회",
    description: "모든 게시판의 게시글을 조회하며, 제목(title), 내용(content)으로 검색",
  })
  async findArticle(@Param("id") id: number, @Query() query: GetArticleDto) {
    return this.articleService.findArticleById(id, query);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post("/:id/comments")
  // @ApiOperation({
  //   summary: "[서비스] 게시글 댓글 쓰기",
  //   description: "게시글에 새로운 댓글을 등록한다",
  // })
  // async createCommentByArticle(
  //   @Param("id") id: number,
  //   @Body() createCommentDto: CreateArticleCommentDto,
  //   @UserDeco() user: User
  // ) {
  //   const comment = await this.articleCommentService.create({
  //     articleId: id,
  //     writerId: user.id,
  //     writerName: user.name,
  //     ...createCommentDto,
  //   });

  //   return comment;
  // }

  // @Get(":id/comments")
  // @ApiOperation({
  //   summary: "[서비스] 게시글 상세 내용을 댓글과 함께 읽기",
  //   description: "댓글을 포함한 게시글을 읽습니다",
  // })
  // async readArticleInDetail(@Param("id") id: number) {
  //   await this.articleService.increaseViewCount(id);
  //   return this.articleService.findArticleById({ id });
  // }

  @Patch(":id/increaseViewCnt")
  increaseViewCnt(@Param("id") id: string) {
    return this.articleService.increaseViewCount(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "[서비스] 게시물 수정",
    description: "게시물을 수정합니다",
  })
  @Patch(":id")
  updateArticle(
    @Param("id") id: number,
    @UserDeco() user: User,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    if (
      !this.articleService.checkOwnership({
        id,
        writerId: user.id,
      })
    ) {
      throw new HttpException(
        "직접 작성한 게시글에 대해서만 수정할 수 있습니다",
        HttpStatus.BAD_REQUEST
      );
    }
    return this.articleService.update(+id, updateArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "[서비스] 게시물 삭제",
    description: "게시물을 삭제합니다",
  })
  remove(@Param("id") id: number, @UserDeco() user: User) {
    if (
      !this.articleService.checkOwnership({
        id,
        writerId: user.id,
      })
    ) {
      throw new HttpException(
        "직접 작성한 게시글에 대해서만 삭제할 수 있습니다",
        HttpStatus.BAD_REQUEST
      );
    }

    return this.articleService.remove(+id);
  }
}
