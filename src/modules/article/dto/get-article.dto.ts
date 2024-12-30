import { IsOptional } from "class-validator";
import { BaseGetDto } from "common/dto/base.dto";

export class GetArticleDto extends BaseGetDto {
  @IsOptional()
  id: number;

  @IsOptional()
  title: string;

  @IsOptional()
  content: string;

  @IsOptional()
  boardId: number;
}

export class GetArticlesByBoardDto extends BaseGetDto {
  readonly id: number;

  @IsOptional()
  title: string;
  @IsOptional()
  content: string;
}

export class GetCommentsByArticleDto extends BaseGetDto {
  readonly id: number;
}
