import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ description: "제목" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "내용" })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: "요약" })
  @IsNotEmpty()
  @IsString()
  summary: string;

  @ApiProperty({ description: "썸네일", required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ description: "참조 장소", required: false })
  @IsOptional()
  @IsString()
  referencePlace?: string;

  @ApiProperty({ description: "이미지들", required: false })
  @IsOptional()
  @IsString()
  images?: string;

  @ApiProperty({ description: "첨부파일들", required: false })
  @IsOptional()
  @IsString()
  attachFiles?: string;

  @ApiProperty({ description: "카테고리 ID" })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: "서브카테고리 ID", required: false })
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;
}
