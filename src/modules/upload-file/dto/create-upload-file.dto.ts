import { IsOptional } from "class-validator";

export class CreateUploadFileDto {
  @IsOptional()
  name: string;

  @IsOptional()
  originalName: string;

  @IsOptional()
  encoding: string;

  @IsOptional()
  mimeType: string;

  @IsOptional()
  size: number;

  @IsOptional()
  url: string;
}
