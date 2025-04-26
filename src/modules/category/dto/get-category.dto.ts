import { IsOptional, IsString } from "class-validator";

export class GetCategoryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  start?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  sort?: string;
}
