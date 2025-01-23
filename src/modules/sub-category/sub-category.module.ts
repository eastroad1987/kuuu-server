import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/entities/category.entity";
import { SubCategoryController } from "./sub-category.controller";
import { SubCategoryService } from "./sub-category.service";
import { SubCategory } from "./entities/sub-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory, Category])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
