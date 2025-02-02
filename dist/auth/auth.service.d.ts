import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { TransactionalRepository } from "./../common/unit-of-work/transactional.repository";
import { UnitOfWork } from "./../common/unit-of-work/unit-of-work.provider";
import { CreateUserDto } from "modules/user/dto/create-user.dto";
import { User } from "modules/user/entities/user.entity";
import { UserService } from "modules/user/user.service";
import { Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import { AuthUserDto } from "./dto/auth.user";
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    private uow;
    protected repository: TransactionalRepository;
    protected userRepository: Repository<User>;
    private readonly logger;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService, uow: UnitOfWork, repository: TransactionalRepository, userRepository: Repository<User>);
    loginAdmin(authDto: AuthDto): Promise<any>;
    signup(user: CreateUserDto): Promise<any>;
    private saveTransactionUser;
    private generateAccessRefreshToken;
    checkExistUserByOauth(req: any): Promise<User>;
    private verifyPassword;
    private toHashed;
    getTokens(userId: number, email: string): Promise<any>;
    getAccessToken(userId: number, email: string): Promise<any>;
    getUserIfRefreshTokenMatches(refreshToken: string, id: number): Promise<User>;
    removeRefreshToken(user: AuthUserDto): Promise<void>;
    refreshToken(id: number, refreshToken: string): Promise<{
        accessToken: any;
    }>;
}
