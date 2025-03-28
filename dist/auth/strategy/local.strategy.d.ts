import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { User } from "modules/user/entities/user.entity";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<User>);
    validate(email: string): Promise<any>;
}
export {};
