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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === "prod"
          ? ".env.prod"
          : process.env.NODE_ENV === "dev"
            ? ".env.dev"
            : ".env",
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: false,
        sslmode: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        poolSize: 1,
      }),
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
