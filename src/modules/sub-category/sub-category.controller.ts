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
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { GetSubCategoryDto } from "./dto/get-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import { SubCategoryService } from "./sub-category.service";

@ApiTags("[Service] 서브카테고리")
@Controller("subcategory")
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: "[서비스] 서브카테고리 생성",
    description: "새로운 서브카테고리를 생성합니다",
  })
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: "[서비스] 서브카테고리 목록 조회",
    description: "서브카테고리 목록을 조회합니다",
  })
  findAll(@Query() query: GetSubCategoryDto) {
    return this.subCategoryService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "[서비스] 서브카테고리 상세 조회",
    description: "특정 서브카테고리의 상세 정보를 조회합니다",
  })
  findOne(@Param("id") id: string) {
    return this.subCategoryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({
    summary: "[서비스] 서브카테고리 수정",
    description: "서브카테고리 정보를 수정합니다",
  })
  update(@Param("id") id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryService.update(+id, updateSubCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "[서비스] 서브카테고리 삭제",
    description: "서브카테고리를 삭제합니다",
  })
  remove(@Param("id") id: string) {
    return this.subCategoryService.remove(+id);
  }
}
