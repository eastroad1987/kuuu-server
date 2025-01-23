import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetSubCategoryDto {
  @ApiProperty({ description: "검색할 서브카테고리 제목", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: "카테고리 ID", required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ description: "시작 위치", required: false })
  @IsOptional()
  start?: number;

  @ApiProperty({ description: "가져올 항목 수", required: false })
  @IsOptional()
  limit?: number;
}
