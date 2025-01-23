import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetPostDto {
  @ApiProperty({ description: "검색할 제목", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: "검색할 내용", required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: "카테고리 ID", required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ description: "서브카테고리 ID", required: false })
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;

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
