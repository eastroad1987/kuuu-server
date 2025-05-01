import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserRole } from "./entities/user.entity";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        password: any;
        email: string;
        name: string;
        role?: UserRole;
        deviceToken?: string;
        imageUrl?: string;
        snsId?: string;
    } & User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(user: User): Promise<{
        accessToken: string;
    }>;
    findAll(): Promise<User[]>;
    getProfile(user: User): Promise<User>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, user: User): Promise<User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    logout(user: User): Promise<{
        message: string;
    }>;
}
