import { Column, Entity } from "typeorm";
import { BaseModel } from "../../../common/entity/base.entity";

@Entity("upload_file")
export class UploadFile extends BaseModel {
  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "파일명",
    length: 255,
  })
  name: string;

  @Column("varchar", {
    name: "original_name",
    nullable: true,
    comment: "원본파일명",
    length: 255,
  })
  originalName: string;

  @Column("varchar", {
    name: "encoding",
    nullable: true,
    comment: "인코딩",
    length: 255,
  })
  encoding: string;

  @Column("varchar", {
    name: "mime_type",
    nullable: true,
    comment: "MIME 타입",
    length: 255,
  })
  mimeType: string;

  @Column("decimal", { name: "size", precision: 10, scale: 2 })
  size: number;

  @Column({ name: "url", comment: "s3 업로드된 location url" })
  url: string;
}
