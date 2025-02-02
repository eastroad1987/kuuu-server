import { UserRole } from "../entities/user.entity";
export declare class CreateUserDto {
    email: string;
    name: string;
    password: string;
    role?: UserRole;
    deviceToken?: string;
    imageUrl?: string;
    snsId?: string;
}
