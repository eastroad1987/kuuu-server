import { BaseGetDto } from "common/dto/base.dto";
import { IsOptional, IsNumber } from "class-validator";

export class GetBoardDto extends BaseGetDto {
  @IsOptional()
  @IsNumber()
  id?: number;
}
