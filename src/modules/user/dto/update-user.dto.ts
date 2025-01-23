import { ApiProperty, PartialType, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ["password"] as const)) {
  @ApiProperty({ description: "현재 비밀번호", required: false })
  @IsOptional()
  @IsString()
  currentPassword?: string;

  @ApiProperty({ description: "새 비밀번호", required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  newPassword?: string;
}
