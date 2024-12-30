import { BaseModel } from "common/entity/base.entity";
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User extends BaseModel {
    id: number;
    email: string;
    name: string;
    password: string;
    role: UserRole;
    accessToken: string;
    refreshToken: string;
    deviceToken: string;
    imageUrl: string;
    snsId: string;
}
