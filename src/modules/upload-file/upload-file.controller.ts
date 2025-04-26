import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor";
import { FilesInterceptor } from "@nestjs/platform-express/multer/interceptors/files.interceptor";
import * as AWS from "aws-sdk";
import "dotenv/config";
import * as multerS3 from "multer-s3";
import { S3Service } from "providers/aws/aws-s3.service";
import { UpdateUploadFileDto } from "./dto/update-upload-file.dto";
import { UploadFileService } from "./upload-file.service";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

@Controller("upload-file")
export class UploadFileController {
  private bucket: string;
  constructor(
    private readonly uploadFileService: UploadFileService,
    private readonly s3Service: S3Service,
    private configService: ConfigService
  ) {
    AWS.config.update({
      accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
      region: "ap-northeast-2",
    });
    this.bucket = configService.get("AWS_S3_BUCKET_NAME");
  }

  @Get("presigned-url")
  async getPresignedUrl(@Query("key") key: string): Promise<{ url: string }> {
    const url = await this.s3Service.generatePresignedUrl(key);
    return { url };
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor("file", 20, {
      storage: multerS3({
        s3: s3Client,
        bucket: "s3-kuuu",
        key: function (request, file, cb) {
          cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
      }),
      limits: {},
    })
  )
  async uploadFile(@UploadedFiles() files: Express.MulterS3.File[]) {
    return this.uploadFileService.uploadFile(files);
  }

  @Post("get-presigned-url")
  async postPresignedUrl(@Body() body) {
    return await this.uploadFileService.getPreSignedUrl(body);
  }

  @Post("create-multipart")
  async createMultiPart(@Body("key") key: string) {
    return await this.uploadFileService.createMultipartUpload(key);
  }

  @Post("upload-part")
  @UseInterceptors(FileInterceptor("file"))
  async uploadPart(
    @UploadedFile() file,
    @Body("uploadId") uploadId: string,
    @Body("key") key: string,
    @Body("partNumber") partNumber: number
  ) {
    return await this.uploadFileService.uploadPart(uploadId, key, partNumber, file);
  }

  @Post("complete-multipart")
  async completeMultiPart(
    @Body("uploadId") uploadId: string,
    @Body("key") key: string,
    @Body("parts") parts: { ETag: string; PartNumber: number }[]
  ) {
    return await this.uploadFileService.completeMultiPart(uploadId, key, parts);
  }

  @Post("abort-multipart")
  async abortMultiPart(@Body() body) {
    return await this.uploadFileService.abortMultiPart(body);
  }

  @Post("create")
  @UseInterceptors(FileInterceptor("file"))
  createUploadFile(@UploadedFile() file, @Body() updateUploadFileDto: UpdateUploadFileDto) {
    console.log(file);
    console.log(updateUploadFileDto);
    return this.uploadFileService.create(updateUploadFileDto);
  }

  @Get()
  findAll() {
    return this.uploadFileService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.uploadFileService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUploadFileDto: UpdateUploadFileDto) {
    return this.uploadFileService.update(+id, updateUploadFileDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.uploadFileService.remove(+id);
  }
}
