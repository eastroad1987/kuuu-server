import { IsOptional, IsNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class BaseGetDto {
  @ApiProperty({ required: false, description: "시작 (default: 0)" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly start?: number;

  @ApiProperty({ required: false, description: "개수 (default: 20개)" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly limit?: number;

  @ApiProperty({ required: false, description: "정렬 (예: id:DESC)" })
  @IsOptional()
  @IsString()
  readonly sort?: string;

  @ApiProperty({ required: false, description: "id리스트 (예: 1,2,3)" })
  @IsOptional()
  @IsString()
  readonly ids?: string;

  @ApiProperty({ required: false, description: "검색어" })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({ required: false, description: "" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly startDate?: Date;

  @ApiProperty({ required: false, description: "" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly endDate?: Date;

  @ApiProperty({ required: false, description: "" })
  @IsOptional()
  readonly filter?: any[];
}
