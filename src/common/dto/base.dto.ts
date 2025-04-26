import { IsOptional, IsNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class BaseGetDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly start?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly limit?: number;

  @IsOptional()
  @IsString()
  readonly sort?: string;

  @IsOptional()
  @IsString()
  readonly ids?: string;

  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly endDate?: Date;

  @IsOptional()
  readonly filter?: any[];
}
