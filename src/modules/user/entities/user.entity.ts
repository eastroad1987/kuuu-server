import { Exclude } from "class-transformer";
import { KuuuTableEnums, UserEnums } from "common/constants/KuuuTableEnums";
import { BaseModel } from "common/entity/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity(KuuuTableEnums.USER)
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    name: UserEnums.EMAIL,
    nullable: true,
    comment: "이메일",
    length: 255,
  })
  email: string;

  @Column("varchar", {
    name: UserEnums.NAME,
    nullable: true,
    comment: "이름",
    length: 255,
  })
  name: string;

  @Exclude()
  @Column("varchar", {
    name: UserEnums.PASSWORD,
    nullable: true,
    comment: "비밀번호",
    length: 255,
  })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  @Exclude()
  role: UserRole;

  @Column("varchar", {
    name: UserEnums.ACCESS_TOKEN,
    nullable: true,
    comment: "accessToken",
    length: 255,
  })
  accessToken: string;

  @Column("varchar", {
    name: UserEnums.REFRESH_TOKEN,
    nullable: true,
    comment: "refreshToken",
    length: 255,
  })
  refreshToken: string;

  @Column("varchar", {
    name: UserEnums.DEVICE_TOKEN,
    nullable: true,
    comment: "deviceToken",
    length: 255,
  })
  deviceToken: string;

  @Column("varchar", {
    name: UserEnums.IMAGE_URL,
    nullable: true,
    comment: "이미지 url",
    length: 255,
  })
  imageUrl: string;

  @Column("varchar", {
    name: UserEnums.SNS_ID,
    nullable: true,
    comment: "snsId",
    length: 255,
  })
  snsId: string;
}
