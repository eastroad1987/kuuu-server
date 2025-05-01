import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/strategy/jwt-auth.guard";
import { Roles } from "../../common/decorator/roles.decorator";
import { UserDeco } from "../../common/decorator/user.decorator";
import { RolesGuard } from "../../common/guard/roles.guards";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserRole } from "./entities/user.entity";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  async refreshToken(@UserDeco() user: User): Promise<{ accessToken: string }> {
    return this.userService.refreshToken(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@UserDeco() user: User): Promise<User> {
    return this.userService.findOne(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UserDeco() user: User
  ): Promise<User> {
    if (user.id !== +id && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException("You can only update your own profile");
    }
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.userService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@UserDeco() user: User): Promise<void> {
    return this.userService.logout(user.id);
  }
}
