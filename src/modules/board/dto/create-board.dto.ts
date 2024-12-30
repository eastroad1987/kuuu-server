import { IsNotEmpty, IsOptional } from "class-validator";
import { BoardTypeEnums } from "common/constants/BoardTypeEnums";

export class CreateBoardDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  boardName: string;

  @IsNotEmpty()
  boardType: BoardTypeEnums;

  @IsOptional()
  anonymousYn: string;

  @IsOptional()
  titleYn: string;

  @IsOptional()
  contentYn: string;

  @IsOptional()
  thumbnailYn: string;

  @IsOptional()
  referencePlaceYn: string;

  @IsOptional()
  secretYn: string;

  @IsOptional()
  imagesYn: string;

  @IsOptional()
  attachFilesYn: string;

  @IsOptional()
  commentYn: string;

  @IsOptional()
  viewCntYn: string;

  @IsOptional()
  likeYn: string;
}
