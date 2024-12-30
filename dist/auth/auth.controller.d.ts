import { BaseController } from "common/controller/base.controller";
import { CreateUserDto } from "modules/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
export declare class AuthController extends BaseController {
    private authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<any>;
    loginAdmin(authDto: AuthDto): Promise<any>;
    findUser(user: any): Promise<any>;
    refresh(req: any, authDto: AuthDto): Promise<{
        accessToken: any;
    }>;
}
