import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { YnEnums } from "common/constants/YnEnums";

export class CreateSubCategoryDto {
  @ApiProperty({ description: "서브 카테고리 제목" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "카테고리 ID" })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: "익명 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  anonymousYn?: YnEnums = YnEnums.N;

  @ApiProperty({ description: "제목 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  titleYn?: YnEnums = YnEnums.Y;

  @ApiProperty({ description: "내용 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  contentYn?: YnEnums = YnEnums.Y;

  @ApiProperty({ description: "썸네일 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  thumbnailYn?: YnEnums = YnEnums.N;

  @ApiProperty({ description: "참조 장소 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  referencePlaceYn?: YnEnums = YnEnums.N;

  @ApiProperty({ description: "비밀글 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  secretYn?: YnEnums = YnEnums.N;

  @ApiProperty({ description: "이미지 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  imagesYn?: YnEnums = YnEnums.N;

  @ApiProperty({ description: "첨부파일 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  attachFilesYn?: YnEnums = YnEnums.N;

  @ApiProperty({ description: "댓글 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  commentYn?: YnEnums = YnEnums.Y;

  @ApiProperty({ description: "조회수 사용 여부", enum: YnEnums })
  @IsEnum(YnEnums)
  @IsOptional()
  viewCntYn?: YnEnums = YnEnums.Y;
}
