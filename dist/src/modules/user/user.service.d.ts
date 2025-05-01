import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { LoginDto } from "./dto/login.dto";
export declare class UserService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        password: any;
        email: string;
        name: string;
        role?: import("./entities/user.entity").UserRole;
        deviceToken?: string;
        imageUrl?: string;
        snsId?: string;
    } & User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(userId: number): Promise<{
        accessToken: string;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    logout(id: number): Promise<void>;
}
