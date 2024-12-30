import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { User } from "modules/user/entities/user.entity";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    validate(payload: any): Promise<User>;
}
export {};
