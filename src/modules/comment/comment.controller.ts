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

import { JwtAuthGuard } from "../../auth/strategy/jwt-auth.guard";
import { UserDeco } from "../../common/decorator/user.decorator";
import { User } from "../user/entities/user.entity";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetCommentDto } from "./dto/get-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @UserDeco() user: User) {
    return this.commentService.create(createCommentDto, user.id);
  }

  @Get()
  findAll(@Query() query: GetCommentDto) {
    return this.commentService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @UserDeco() user: User
  ) {
    return this.commentService.update(+id, updateCommentDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @UserDeco() user: User) {
    return this.commentService.remove(+id, user.id);
  }
}
