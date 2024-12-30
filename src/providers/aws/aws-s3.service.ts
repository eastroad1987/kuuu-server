import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      region: this.configService.get("AWS_REGION"),
    });
    this.s3 = new AWS.S3();
  }

  async generatePresignedUrl(key: string): Promise<string> {
    const expires = 3600; // expires in seconds
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: expires, // Time in seconds
    };

    return this.s3.getSignedUrlPromise("putObject", params);
  }

  async listMultipartUploads(): Promise<AWS.S3.ListMultipartUploadsOutput> {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
    };
    return this.s3.listMultipartUploads(params).promise();
  }

  async createMultipartUpload(key: string): Promise<AWS.S3.CreateMultipartUploadOutput> {
    const bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    return this.s3.createMultipartUpload(params).promise();
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

    return this.s3.uploadPart(params).promise();
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
    return this.s3.completeMultipartUpload(params).promise();
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
    return this.s3.abortMultipartUpload(params).promise();
  }
}
