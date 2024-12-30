import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateArticleCommentDto {
  @IsOptional()
  id: number | null;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  articleId: number;

  @IsOptional()
  writerId: number;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  writerName: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  comment: string;

  @IsOptional()
  filePath: string;
}
