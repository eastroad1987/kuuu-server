import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetCommentDto {
  @IsOptional()
  @IsNumber()
  postId?: number;

  @IsOptional()
  @IsNumber()
  authorId?: number;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  start?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  sort?: string;
}
