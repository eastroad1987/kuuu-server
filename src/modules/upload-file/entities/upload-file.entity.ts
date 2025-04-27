import { Column, Entity } from "typeorm";
import { BaseModel } from "../../../common/entity/base.entity";
import { KuuuTableEnums, UploadFileEnums } from "../../../common/constants/KuuuTableEnums";

@Entity(KuuuTableEnums.UPLOAD_FILE)
export class UploadFile extends BaseModel {
  @Column("varchar", {
    name: UploadFileEnums.NAME,
    nullable: true,
    comment: "파일명",
    length: 255,
  })
  name: string;

  @Column("varchar", {
    name: UploadFileEnums.ORIGINAL_NAME,
    nullable: true,
    comment: "원본파일명",
    length: 255,
  })
  originalName: string;

  @Column("varchar", {
    name: UploadFileEnums.ENCODING,
    nullable: true,
    comment: "인코딩",
    length: 255,
  })
  encoding: string;

  @Column("varchar", {
    name: UploadFileEnums.MIME_TYPE,
    nullable: true,
    comment: "MIME 타입",
    length: 255,
  })
  mimeType: string;

  @Column("decimal", { name: UploadFileEnums.SIZE, precision: 10, scale: 2 })
  size: number;

  @Column({ name: UploadFileEnums.URL, comment: "s3 업로드된 location url" })
  url: string;
}
