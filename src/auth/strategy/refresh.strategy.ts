import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor(
    private authService: AuthService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.body?.refreshToken;
        },
      ]),
      secretOrKey: configService.get("JWT_REFRESH"),
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const refreshToken = req.body.refreshToken;
    return this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
  }
}
