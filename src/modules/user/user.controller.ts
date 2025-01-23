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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "auth/strategy/jwt-auth.guard";
import { Roles } from "common/decorator/roles.decorator";
import { UserDeco } from "common/decorator/user.decorator";
import { RolesGuard } from "common/guard/roles.guards";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserRole } from "./entities/user.entity";
import { UserService } from "./user.service";

@ApiTags("[Service] 사용자")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @ApiOperation({
    summary: "[서비스] 회원가입",
    description: "새로운 사용자를 등록합니다",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  @ApiOperation({
    summary: "[서비스] 로그인",
    description: "사용자 로그인을 처리합니다",
  })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  @ApiOperation({
    summary: "[서비스] 토큰 갱신",
    description: "액세스 토큰을 갱신합니다",
  })
  refreshToken(@UserDeco() user: User) {
    return this.userService.refreshToken(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({
    summary: "[서비스] 사용자 목록 조회",
    description: "모든 사용자 목록을 조회합니다",
  })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiOperation({
    summary: "[서비스] 내 프로필 조회",
    description: "현재 로그인한 사용자의 프로필을 조회합니다",
  })
  getProfile(@UserDeco() user: User) {
    return this.userService.findOne(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(":id")
  @ApiOperation({
    summary: "[서비스] 사용자 상세 조회",
    description: "특정 사용자의 상세 정보를 조회합니다",
  })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({
    summary: "[서비스] 사용자 정보 수정",
    description: "사용자 정보를 수정합니다",
  })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @UserDeco() user: User) {
    if (user.id !== +id && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException("You can only update your own profile");
    }
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  @ApiOperation({
    summary: "[서비스] 사용자 삭제",
    description: "사용자를 삭제합니다",
  })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  @ApiOperation({
    summary: "[서비스] 로그아웃",
    description: "사용자 로그아웃을 처리합니다",
  })
  logout(@UserDeco() user: User) {
    return this.userService.logout(user.id);
  }
}
