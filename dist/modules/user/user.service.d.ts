import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
export declare class UserService {
    private usersRepository;
    private readonly logger;
    constructor(usersRepository: Repository<User>);
    createByAdmin(user: User, createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    updateByAdmin(user: User, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    findEmail(email: string): Promise<User>;
    findOneColumn(column: string, value: string | number): Promise<User>;
}
