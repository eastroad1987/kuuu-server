import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @ApiProperty({ description: "이메일" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "이름" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "비밀번호" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: "역할", enum: UserRole, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ description: "디바이스 토큰", required: false })
  @IsOptional()
  @IsString()
  deviceToken?: string;

  @ApiProperty({ description: "프로필 이미지 URL", required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: "SNS ID", required: false })
  @IsOptional()
  @IsString()
  snsId?: string;
}
