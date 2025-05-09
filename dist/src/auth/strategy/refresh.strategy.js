"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
let RefreshStrategy = class RefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "refresh") {
    constructor(authService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.refreshToken;
                },
            ]),
            secretOrKey: configService.get("JWT_REFRESH"),
            passReqToCallback: true,
        });
        this.authService = authService;
    }
    async validate(req, payload) {
        const refreshToken = req.body.refreshToken;
        return this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
    }
};
exports.RefreshStrategy = RefreshStrategy;
exports.RefreshStrategy = RefreshStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], RefreshStrategy);
//# sourceMappingURL=refresh.strategy.js.map