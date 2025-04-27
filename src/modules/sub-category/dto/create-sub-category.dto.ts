import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { YnEnums } from "../../../common/constants/YnEnums";

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  anonymousYn?: YnEnums = YnEnums.N;

  @IsOptional()
  titleYn?: YnEnums = YnEnums.Y;

  @IsOptional()
  contentYn?: YnEnums = YnEnums.Y;

  @IsOptional()
  thumbnailYn?: YnEnums = YnEnums.N;

  @IsOptional()
  referencePlaceYn?: YnEnums = YnEnums.N;

  @IsOptional()
  secretYn?: YnEnums = YnEnums.N;

  @IsOptional()
  imagesYn?: YnEnums = YnEnums.N;

  @IsOptional()
  attachFilesYn?: YnEnums = YnEnums.N;

  @IsOptional()
  commentYn?: YnEnums = YnEnums.Y;

  @IsOptional()
  viewCntYn?: YnEnums = YnEnums.Y;
}
