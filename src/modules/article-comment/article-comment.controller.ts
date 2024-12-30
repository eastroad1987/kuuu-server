import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ArticleCommentService } from "./article-comment.service";
import { CreateArticleCommentDto } from "./dto/create-article-comment.dto";
import { UpdateArticleCommentDto } from "./dto/update-article-comment.dto";

@ApiTags("[Service] 게시글 댓글")
@Controller("article-comment")
export class ArticleCommentController {
  constructor(private readonly commentService: ArticleCommentService) {}

  @ApiOperation({
    summary: "[서비스] 게시글 댓글 생성",
    description: "댓글을 생성합니다",
  })
  @Post()
  create(@Body() createArticleDto: CreateArticleCommentDto) {
    return this.commentService.create(createArticleDto);
  }

  @ApiOperation({
    summary: "[서비스] 게시글 댓글 수정",
    description: "댓글의 내용을 수정합니다",
  })
  @Patch()
  update(@Body() updateCommentDto: UpdateArticleCommentDto) {
    return this.commentService.update(updateCommentDto);
  }

  @ApiOperation({
    summary: "[서비스] 게시글 댓글 삭제",
    description: "댓글을 삭제합니다",
  })
  @Delete()
  async remove(@Body() updateCommentDto: UpdateArticleCommentDto) {
    return await this.commentService.remove(updateCommentDto);
  }

  @ApiOperation({
    summary: "[서비스] 게시글 댓글 리스트",
    description: "댓글 리스트",
  })
  @Get(":articleId")
  async findCommentsByArticle(@Param("articleId") articleId: number) {
    return await this.commentService.findCommentsByArticle(articleId);
  }
}
