import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ description: "게시글 ID" })
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @ApiProperty({ description: "댓글 내용" })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: "파일 경로", required: false })
  @IsOptional()
  @IsString()
  filePath?: string;

  @ApiProperty({ description: "부모 댓글 ID", required: false })
  @IsOptional()
  @IsNumber()
  parentCommentId?: number;
}
