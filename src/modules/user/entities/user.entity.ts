import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../../../common/entity/base.entity";
import { Post } from "../../post/entities/post.entity";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity("user")
export class User extends BaseModel {
  @Column("varchar", {
    name: "email",
    length: 255,
    nullable: false,
    unique: true,
    comment: "이메일",
  })
  email: string;

  @Column("varchar", {
    name: "name",
    length: 255,
    nullable: false,
    comment: "이름",
  })
  name: string;

  @Column("enum", {
    name: "role",
    enum: UserRole,
    default: UserRole.USER,
    comment: "역할",
  })
  role: UserRole;

  @Column("varchar", {
    name: "password",
    length: 255,
    nullable: false,
    comment: "비밀번호",
    select: false,
  })
  password: string;

  @Column("text", {
    name: "access_token",
    nullable: true,
    comment: "액세스 토큰",
  })
  accessToken: string;

  @Column("text", {
    name: "refresh_token",
    nullable: true,
    comment: "리프레시 토큰",
  })
  refreshToken: string;

  @Column("varchar", {
    name: "device_token",
    length: 255,
    nullable: true,
    comment: "디바이스 토큰",
  })
  deviceToken: string;

  @Column("varchar", {
    name: "image_url",
    length: 255,
    nullable: true,
    comment: "프로필 이미지 URL",
  })
  imageUrl: string;

  @Column("varchar", {
    name: "sns_id",
    length: 255,
    nullable: true,
    comment: "SNS ID",
  })
  snsId: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
