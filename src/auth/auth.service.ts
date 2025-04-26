import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, hash } from "bcrypt";
import { TransactionalRepository } from "./../common/unit-of-work/transactional.repository";
import { UnitOfWork } from "./../common/unit-of-work/unit-of-work.provider";

import { CreateUserDto } from "modules/user/dto/create-user.dto";
import { User } from "modules/user/entities/user.entity";
import { UserService } from "modules/user/user.service";
import { Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import { AuthUserDto } from "./dto/auth.user";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private uow: UnitOfWork,
    protected repository: TransactionalRepository,
    @InjectRepository(User)
    protected userRepository: Repository<User>
  ) {}

  async loginAdmin(authDto: AuthDto) {
    console.log("[loginAdmin] authDto : ", authDto);

    const user = await this.userRepository.findOne({ where: { email: authDto.email } });

    if (!user) {
      throw new HttpException("아이디 패스워드를 확인해주세요", HttpStatus.BAD_REQUEST);
    }
    let token;
    await this.uow.withTransaction(async () => {
      await this.verifyPassword(authDto.password, user);

      token = await this.generateAccessRefreshToken(user);
    });
    return token;
  }

  async signup(user: CreateUserDto) {
    const currentUser = await this.userRepository.findOne({ where: { email: user.email } });
    if (currentUser) {
      throw new HttpException("이미 등록된 이메일입니다.", HttpStatus.BAD_REQUEST);
    }
    user.password = await this.toHashed(user.password);
    return this.saveTransactionUser(user);
  }
  private async saveTransactionUser(user: CreateUserDto) {
    let token;
    await this.uow.withTransaction(async () => {
      const createUser = await this.repository.getRepository(User).create(user);
      const entity = {
        ...createUser,
      };
      const savedUser = await this.repository.getRepository(User).save(entity);

      token = await this.generateAccessRefreshToken(savedUser);
    });
    return token;
  }

  private async generateAccessRefreshToken(user: User): Promise<any> {
    const tokens = await this.getTokens(user.id, user.email);
    const hashedRefreshToken = await this.toHashed(tokens.refreshToken);
    await this.repository.getRepository(User).update(user.id, { refreshToken: hashedRefreshToken });
    return tokens;
  }
  async checkExistUserByOauth(req): Promise<User> {
    const currentUser = await this.userService.findOne(req.user.name);
    return currentUser;
  }

  private async verifyPassword(plainTextPassword: string, user: User) {
    const isPasswordMatch = await compare(plainTextPassword, user.password);
    if (!isPasswordMatch) {
      await this.userService.update(user.id, user as any);
      throw new HttpException("비밀번호가 일치하지 않습니다!!", HttpStatus.BAD_REQUEST);
    }
  }

  private async toHashed(plainTextPassword: string) {
    const saltOrRounds = 10;
    return await hash(plainTextPassword, saltOrRounds);
  }

  async getTokens(userId: number, email: string): Promise<any> {
    const jwtPayload = {
      id: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(jwtPayload, {
        secret: this.configService.get("JWT_ACCESS"),
        expiresIn: "7d",
      }),
      this.jwtService.sign(jwtPayload, {
        secret: this.configService.get("JWT_REFRESH"),
        expiresIn: "7d",
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getAccessToken(userId: number, email: string): Promise<any> {
    const jwtPayload = {
      id: userId,
      email: email,
    };
    return this.jwtService.sign(jwtPayload, {
      secret: this.configService.get("JWT_ACCESS"),
      expiresIn: "12h",
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.userService.findOne(id);

    const isRefreshTokenMatching = compare(refreshToken, user.refreshToken);
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(user: AuthUserDto) {
    console.log("[removeRefreshToken] user : ", user);
    return;
    // return this.userService.update(user.id, {
    //   refreshToken: null,
    // });
  }

  async refreshToken(id: number, refreshToken: string) {
    const user = await this.userService.findOne(id);

    if (!user) throw new HttpException("인증실패.", HttpStatus.UNAUTHORIZED);

    const storeRefreshToken = user.refreshToken;
    const refreshTokenMatches = await compare(refreshToken, storeRefreshToken);

    if (!refreshTokenMatches) throw new HttpException("인증실패.", HttpStatus.UNAUTHORIZED);
    const accessToken = await this.getAccessToken(user.id, user.email);
    return { accessToken };
  }
}
