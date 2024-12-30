import { UserRole } from "../entities/user.entity";
export declare class CreateUserDto {
    id: number;
    email: string;
    name: string;
    imageUrl: string;
    role: UserRole;
    password: string;
    accessToken: string;
    refreshToken: string;
    deviceToken: string;
    snsId: string;
}
