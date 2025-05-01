import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  ListMultipartUploadsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get("AWS_REGION"),
      credentials: {
        accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      },
    });
  }

  async generatePresignedUrl(key: string): Promise<string> {
    const expires = 3600;
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3Client as any, command, { expiresIn: expires });
  }

  async listMultipartUploads() {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const command = new ListMultipartUploadsCommand({
      Bucket: bucketName,
    });

    const response = await this.s3Client.send(command);
    return { Uploads: response.Uploads || [] };
  }

  async createMultipartUpload(key: string) {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const command = new CreateMultipartUploadCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    return { UploadId: response.UploadId };
  }

  async uploadChunkPart(uploadId: string, key: string, partNumber: number, chunk: Buffer) {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const command = new UploadPartCommand({
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
      Body: chunk,
    });

    const response = await this.s3Client.send(command);
    return { ETag: response.ETag };
  }

  async completeMultipartUpload(
    key: string,
    uploadId: string,
    parts: { ETag: string; PartNumber: number }[]
  ) {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const command = new CompleteMultipartUploadCommand({
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    });

    const response = await this.s3Client.send(command);
    return { Location: response.Location };
  }

  async abortMultipartUpload(key: string, uploadId: string) {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const command = new AbortMultipartUploadCommand({
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
    });

    await this.s3Client.send(command);
    return { message: "Multipart upload aborted successfully" };
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.configService.get("AWS_S3_BUCKET_NAME"),
      Key: key,
    });

    return await getSignedUrl(this.s3Client as any, command, { expiresIn: 3600 });
  }
}
