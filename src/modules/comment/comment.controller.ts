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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "auth/strategy/jwt-auth.guard";
import { UserDeco } from "common/decorator/user.decorator";
import { User } from "../user/entities/user.entity";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetCommentDto } from "./dto/get-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@ApiTags("[Service] 댓글")
@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: "[서비스] 댓글 생성",
    description: "새로운 댓글을 생성합니다",
  })
  create(@Body() createCommentDto: CreateCommentDto, @UserDeco() user: User) {
    return this.commentService.create(createCommentDto, user.id);
  }

  @Get()
  @ApiOperation({
    summary: "[서비스] 댓글 목록 조회",
    description: "댓글 목록을 조회합니다",
  })
  findAll(@Query() query: GetCommentDto) {
    return this.commentService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "[서비스] 댓글 상세 조회",
    description: "특정 댓글의 상세 정보를 조회합니다",
  })
  findOne(@Param("id") id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({
    summary: "[서비스] 댓글 수정",
    description: "댓글을 수정합니다",
  })
  update(
    @Param("id") id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @UserDeco() user: User
  ) {
    return this.commentService.update(+id, updateCommentDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "[서비스] 댓글 삭제",
    description: "댓글을 삭제합니다",
  })
  remove(@Param("id") id: string, @UserDeco() user: User) {
    return this.commentService.remove(+id, user.id);
  }
}
