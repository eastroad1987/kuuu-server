import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  refreshToken: string;

  @IsOptional()
  @IsString()
  deviceToken: string;

  @IsOptional()
  @IsString()
  snsId: string;
}
