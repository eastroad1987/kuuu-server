import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { BaseController } from "../common/controller/base.controller";
import { CreateUserDto } from "../modules/user/dto/create-user.dto";
import { UserDeco } from "../common/decorator/user.decorator";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { JwtAuthGuard } from "./strategy/jwt-auth.guard";
import { LocalAuthGuard } from "./strategy/local-auth.guard";
import { JwtRefreshGuard } from "./strategy/refresh-token.guard";

@Controller("auth")
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post("admin/signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async loginAdmin(@Body() authDto: AuthDto) {
    return await this.authService.loginAdmin(authDto);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async findUser(@UserDeco() user) {
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post("refresh")
  refresh(@Req() req, @Body() authDto: AuthDto) {
    const user = req.user;
    return this.authService.refreshToken(user.id, authDto.refreshToken);
  }
}
