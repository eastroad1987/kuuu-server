import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand, ListMultipartUploadsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
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
    const expires = 3600; // expires in seconds
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: expires, // Time in seconds
    };

    return this.s3Client.getSignedUrl(new GetObjectCommand(params), { expiresIn: expires });
  }

  async listMultipartUploads(): Promise<AWS.S3.ListMultipartUploadsOutput> {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
    };
    return this.s3Client.listMultipartUploads(params).promise();
  }

  async createMultipartUpload(key: string): Promise<AWS.S3.CreateMultipartUploadOutput> {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    return this.s3Client.createMultipartUpload(params).promise();
  }

  async uploadChunkPart(
    uploadId: string,
    key: string,
    partNumber: number,
    chunk: Buffer
  ): Promise<AWS.S3.UploadPartOutput> {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
      Body: chunk.buffer,
    };

    return this.s3Client.uploadPart(params).promise();
  }

  async completeMultipartUpload(
    key: string,
    uploadId: string,
    parts: AWS.S3.CompletedPart[]
  ): Promise<AWS.S3.CompleteMultipartUploadOutput> {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    };
    return this.s3Client.completeMultipartUpload(params).promise();
  }

  async abortMultipartUpload(
    key: string,
    uploadId: string
  ): Promise<AWS.S3.AbortMultipartUploadOutput> {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
    };
    return this.s3Client.abortMultipartUpload(params).promise();
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.configService.get("AWS_BUCKET_NAME"),
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
}
