import { BaseController } from "common/controller/base.controller";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
export declare class UserController extends BaseController {
    private readonly userService;
    constructor(userService: UserService);
    createByAdmin(createUserDto: CreateUserDto, user: User): Promise<void>;
    updateByAdmin(updateUserDto: UpdateUserDto, user: User): Promise<void>;
}
