import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/entities/category.entity";
import { SubCategoryController } from "./sub-category.controller";
import { SubCategoryService } from "./sub-category.service";
import { SubCategory } from "./entities/sub-category.entity";
import { Post } from "../post/entities/post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory, Category, Post])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
