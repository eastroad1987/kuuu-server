import { Column, Entity } from "typeorm";
import { KuuuTableEnums, UserEnums } from "../../../common/constants/KuuuTableEnums";
import { BaseModel } from "../../../common/entity/base.entity";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity(KuuuTableEnums.USER)
export class User extends BaseModel {
  @Column("varchar", {
    name: UserEnums.EMAIL,
    length: 255,
    nullable: false,
    unique: true,
    comment: "이메일",
  })
  email: string;

  @Column("varchar", {
    name: UserEnums.NAME,
    length: 255,
    nullable: false,
    comment: "이름",
  })
  name: string;

  @Column("enum", {
    name: UserEnums.ROLE,
    enum: UserRole,
    default: UserRole.USER,
    comment: "역할",
  })
  role: UserRole;

  @Column("varchar", {
    name: UserEnums.PASSWORD,
    length: 255,
    nullable: false,
    comment: "비밀번호",
    select: false,
  })
  password: string;

  @Column("text", {
    name: UserEnums.ACCESS_TOKEN,
    nullable: true,
    comment: "액세스 토큰",
  })
  accessToken: string;

  @Column("text", {
    name: UserEnums.REFRESH_TOKEN,
    nullable: true,
    comment: "리프레시 토큰",
  })
  refreshToken: string;

  @Column("varchar", {
    name: UserEnums.DEVICE_TOKEN,
    length: 255,
    nullable: true,
    comment: "디바이스 토큰",
  })
  deviceToken: string;

  @Column("varchar", {
    name: UserEnums.IMAGE_URL,
    length: 255,
    nullable: true,
    comment: "프로필 이미지 URL",
  })
  imageUrl: string;

  @Column("varchar", {
    name: UserEnums.SNS_ID,
    length: 255,
    nullable: true,
    comment: "SNS ID",
  })
  snsId: string;
}
