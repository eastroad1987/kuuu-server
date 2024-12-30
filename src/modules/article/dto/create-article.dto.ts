import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateArticleDto {
  @IsOptional()
  id: number | null;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  boardId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  writerId: number | null;

  @IsOptional()
  writerName: string | null;

  @IsOptional()
  title: string | null;
  @IsOptional()
  content: string | null;
  @IsOptional()
  summary: string | null;
  @IsOptional()
  thumbnail: object | null;
  @IsOptional()
  images: object | null;
  @IsOptional()
  referencePlace: object | null;
  @IsOptional()
  attachFiles: object | null;
  @IsOptional()
  viewCnt: number | null;
}
