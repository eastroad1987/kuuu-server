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

import { Roles } from "common/decorator/roles.decorator";
import { UserRole } from "modules/user/entities/user.entity";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoryDto } from "./dto/get-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { RolesGuard } from "common/guard/roles.guards";

@ApiTags("[Service] 카테고리")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({
    summary: "[서비스] 카테고리 생성",
    description: "새로운 카테고리를 생성합니다",
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: "[서비스] 카테고리 목록 조회",
    description: "카테고리 목록을 조회합니다",
  })
  findAll(@Query() query: GetCategoryDto) {
    return this.categoryService.findAll(query);
  }

  @Get("all")
  @ApiOperation({
    summary: "[서비스] 카테고리 목록 조회",
    description: "카테고리 목록을 조회합니다",
  })
  findCategories() {
    return this.categoryService.findCategories();
  }

  @Get(":id")
  @ApiOperation({
    summary: "[서비스] 카테고리 상세 조회",
    description: "특정 카테고리의 상세 정보를 조회합니다",
  })
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(":id")
  @ApiOperation({
    summary: "[서비스] 카테고리 수정",
    description: "카테고리 정보를 수정합니다",
  })
  update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  @ApiOperation({
    summary: "[서비스] 카테고리 삭제",
    description: "카테고리를 삭제합니다",
  })
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
