import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BaseController } from "common/controller/base.controller";

import { JwtAuthGuard } from "auth/strategy/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDeco } from "common/decorator/user.decorator";
import { User } from "./entities/user.entity";

@ApiTags("[사용자] 블로그 유저")
@Controller("user")
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  // TODO : API not yet developed user create method
  @ApiBearerAuth()
  @Post("admin")
  @UseGuards(JwtAuthGuard)
  async createByAdmin(@Body() createUserDto: CreateUserDto, @UserDeco() user: User): Promise<void> {
    await this.userService.createByAdmin(user, createUserDto);
  }
  // TODO : API not yet developed user update method
  @ApiBearerAuth()
  @Patch("admin")
  @UseGuards(JwtAuthGuard)
  async updateByAdmin(@Body() updateUserDto: UpdateUserDto, @UserDeco() user: User): Promise<void> {
    await this.userService.updateByAdmin(user, updateUserDto);
  }
}
