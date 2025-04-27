import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../modules/user/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { RefreshStrategy } from "./strategy/refresh.strategy";
import { UserModule } from "../modules/user/user.module";
import { UnitOfWork } from "../common/unit-of-work/unit-of-work.provider";
import { TransactionalRepository } from "../common/unit-of-work/transactional.repository";
import { UserService } from "../modules/user/user.service";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_ACCESS"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    UnitOfWork,
    TransactionalRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
