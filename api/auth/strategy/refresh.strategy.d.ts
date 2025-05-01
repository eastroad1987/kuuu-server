import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
declare const RefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshStrategy extends RefreshStrategy_base {
    private authService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(req: any, payload: any): Promise<import("../../modules/user/entities/user.entity").User>;
}
export {};
