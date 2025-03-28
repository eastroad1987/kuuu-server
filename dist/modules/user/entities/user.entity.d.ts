import { BaseModel } from "common/entity/base.entity";
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User extends BaseModel {
    email: string;
    name: string;
    role: UserRole;
    password: string;
    accessToken: string;
    refreshToken: string;
    deviceToken: string;
    imageUrl: string;
    snsId: string;
}
