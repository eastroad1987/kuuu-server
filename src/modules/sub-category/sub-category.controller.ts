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
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { GetSubCategoryDto } from "./dto/get-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import { SubCategoryService } from "./sub-category.service";

@Controller("subcategory")
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get()
  findAll(@Query() query: GetSubCategoryDto) {
    return this.subCategoryService.findAll(query);
  }

  @Get(":id/posts")
  findPostsBySubCategoryId(@Param("id") id: string, @Query() query: GetSubCategoryDto) {
    return this.subCategoryService.findPostsBySubCategoryId(+id, query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subCategoryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryService.update(+id, updateSubCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subCategoryService.remove(+id);
  }
}
