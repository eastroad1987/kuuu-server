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
import { JwtAuthGuard } from "auth/strategy/jwt-auth.guard";
import { UserDeco } from "common/decorator/user.decorator";
import { User } from "../user/entities/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostDto } from "./dto/get-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostService } from "./post.service";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto, 1);
  }

  @Get()
  findAll(@Query() query: GetPostDto) {
    return this.postService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    await this.postService.increaseViewCount(+id);
    return this.postService.findOne(+id);
  }

  @Get("monthly/list")
  async findPostsByMonth() {
    console.log("[findPostsByMonth] controller");
    return await this.postService.findPostsByMonth();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto, @UserDeco() user: User) {
    return this.postService.update(+id, updatePostDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @UserDeco() user: User) {
    return this.postService.remove(+id, user.id);
  }
}
