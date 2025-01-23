import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetCommentDto {
  @ApiProperty({ description: "게시글 ID", required: false })
  @IsOptional()
  @IsNumber()
  postId?: number;

  @ApiProperty({ description: "작성자 ID", required: false })
  @IsOptional()
  @IsNumber()
  authorId?: number;

  @ApiProperty({ description: "검색할 내용", required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: "시작 위치", required: false })
  @IsOptional()
  start?: number;

  @ApiProperty({ description: "가져올 항목 수", required: false })
  @IsOptional()
  limit?: number;

  @ApiProperty({ description: "정렬 (예: createdAt:DESC)", required: false })
  @IsOptional()
  @IsString()
  sort?: string;
}
