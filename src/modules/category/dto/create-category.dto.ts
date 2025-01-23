import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ description: "카테고리 제목" })
  @IsNotEmpty()
  @IsString()
  title: string;
}
