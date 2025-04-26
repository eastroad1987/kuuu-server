import { IsOptional, IsString } from "class-validator";

export class GetSubCategoryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  categoryId?: number;

  @IsOptional()
  start?: number;

  @IsOptional()
  limit?: number;
}
