import { IsOptional, IsString } from "class-validator";

export class AuthDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  currentPassword: string;

  @IsString()
  @IsOptional()
  refreshToken: string;
}
