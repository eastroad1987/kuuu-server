import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { UserModule } from "./modules/user/user.module";

import { UploadFileModule } from "./modules/upload-file/upload-file.module";
import { UnitOfWorkModule } from "./common/unit-of-work/unitofwork.module";

import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./modules/category/category.module";
import { CommentModule } from "./modules/comment/comment.module";
import { PostModule } from "./modules/post/post.module";
import { SubCategoryModule } from "./modules/sub-category/sub-category.module";

let envFilePath;
switch (process.env.NODE_ENV) {
  case "local":
    envFilePath = ".env";
    break;
  case "dev":
    envFilePath = ".env.dev";
    break;
  case "prod":
    envFilePath = ".env.prod";
    break;
  default:
    envFilePath = ".env";
}
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          timezone: "+09:00",
          host: configService.get("MYSQL_HOST"),
          port: configService.get<number>("MYSQL_PORT"),
          username: configService.get("MYSQL_USER"),
          password: configService.get("MYSQL_PASSWORD"),
          database: configService.get("MYSQL_DATABASE"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          ssl: true,
          dropSchema: false,
          synchronize: false,
          logging: process.env.NODE_ENV !== "production",
          connectTimeout: 5000,
          extra: {
            connectionLimit: 5,
            idleTimeoutMillis: 10000,
            connectionTimeoutMillis: 5000,
          },
          poolSize: 5,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    SubCategoryModule,
    CommentModule,
    PostModule,
    UploadFileModule,
    UnitOfWorkModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV !== "production") {
      consumer.apply(LoggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
    }
  }
}
