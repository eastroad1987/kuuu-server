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
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostDto } from "./dto/get-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostService } from "./post.service";

@ApiTags("[Service] 게시글")
@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: "[서비스] 게시글 생성",
    description: "새로운 게시글을 생성합니다",
  })
  create(@Body() createPostDto: CreatePostDto, @UserDeco() user: User) {
    return this.postService.create(createPostDto, 1);
  }

  @Get()
  @ApiOperation({
    summary: "[서비스] 게시글 목록 조회",
    description: "게시글 목록을 조회합니다",
  })
  findAll(@Query() query: GetPostDto) {
    return this.postService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "[서비스] 게시글 상세 조회",
    description: "특정 게시글의 상세 정보를 조회합니다",
  })
  async findOne(@Param("id") id: string) {
    await this.postService.increaseViewCount(+id);
    return this.postService.findOne(+id);
  }

  @Get("monthly/list")
  @ApiOperation({
    summary: "[서비스] 최근 1개월 게시글 조회",
    description: "최근 1개월 동안 작성된 게시글을 조회합니다",
  })
  async findPostsByMonth() {
    console.log("[findPostsByMonth] controller");
    return await this.postService.findPostsByMonth();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({
    summary: "[서비스] 게시글 수정",
    description: "게시글을 수정합니다",
  })
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto, @UserDeco() user: User) {
    return this.postService.update(+id, updatePostDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "[서비스] 게시글 삭제",
    description: "게시글을 삭제합니다",
  })
  remove(@Param("id") id: string, @UserDeco() user: User) {
    return this.postService.remove(+id, user.id);
  }
}
