import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetCategoryDto {
  @ApiProperty({ description: "검색할 카테고리 제목", required: false })
  @IsOptional()
  @IsString()
  title?: string;

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
