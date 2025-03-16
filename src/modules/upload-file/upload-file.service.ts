import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { S3Service } from "providers/aws/aws-s3.service";
import { Repository } from "typeorm";
import { UpdateUploadFileDto } from "./dto/update-upload-file.dto";
import { UploadFile } from "./entities/upload-file.entity";

@Injectable()
export class UploadFileService {
  constructor(
    private configService: ConfigService,
    private s3Service: S3Service,

    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>
  ) {}

  create(updateUploadFileDto: UpdateUploadFileDto) {
    // const uploadFile = new UploadFile();
    // uploadFile.originalName = file.originalname;
    // uploadFile.encoding = file.encoding;
    // uploadFile.mimeType = file.mimetype;
    // uploadFile.size = file.size;
    // uploadFile.url = body.url;
    // uploadFile.name = body.url.split("/").splice(-1)[0];
    return this.uploadFileRepository.save(updateUploadFileDto);
  }

  findAll() {
    return `This action returns all uploadFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadFile`;
  }

  update(id: number, updateUploadFileDto: UpdateUploadFileDto) {
    console.log(updateUploadFileDto);
    return `This action updates a #${id} uploadFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadFile`;
  }

  async uploadFile(files: Express.MulterS3.File[]) {
    const uploadfiles = [];
    console.log("files:", files);
    for (const element of files) {
      const file = new UploadFile();
      file.originalName = element.originalname;
      file.encoding = element.encoding;
      file.mimeType = element.mimetype;
      file.size = element.size;
      file.url = element.location;
      file.name = element.location.split("/").splice(-1)[0];

      uploadfiles.push(file);
    }

    try {
      return { data: await this.uploadFileRepository.save(uploadfiles) };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createMultipartUpload(key: string) {
    const listMultipart = await this.s3Service.listMultipartUploads();
    // console.log(listMultipart)
    listMultipart.Uploads.map((upload) => {
      this.s3Service.abortMultipartUpload(upload.Key, upload.UploadId);
    });
    const res = await this.s3Service.createMultipartUpload(key);
    return res;
  }

  async uploadPart(uploadId: string, key: string, partNumber: number, body: Buffer) {
    const res = await this.s3Service.uploadChunkPart(uploadId, key, partNumber, body);
    return { ETag: res.ETag, PartNumber: partNumber };
  }

  async completeMultiPart(
    uploadId: string,
    key: string,
    parts: { ETag: string; PartNumber: number }[]
  ) {
    const res = await this.s3Service.completeMultipartUpload(key, uploadId, parts);
    return { location: res.Location };
  }

  async getPreSignedUrl(body) {
    return await this.s3Service.generatePresignedUrl(body.name);
  }

  async abortMultiPart(body) {
    return await this.s3Service.abortMultipartUpload(body.name, body.uploadId);
  }
}
