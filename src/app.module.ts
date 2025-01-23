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
import { AppController } from "app.controller";
import { AppService } from "app.service";
import { LoggerMiddleware } from "common/middleware/logger.middleware";
import { HealthCheckController } from "modules/health-check/health-check.controller";
import { TerminusModule } from "@nestjs/terminus";
import { UserModule } from "modules/user/user.module";
import { ArticleModule } from "modules/article/article.module";
import { BoardModule } from "modules/board/board.module";
import { UploadFileModule } from "modules/upload-file/upload-file.module";
import { UnitOfWorkModule } from "common/unit-of-work/unitofwork.module";
import { ArticleCommentModule } from "modules/article-comment/article-comment.module";
import { AuthModule } from "auth/auth.module";

// import { ArticleCommentModule } from 'modules/article-comment/article-comment.module';
// import { ArticleModule } from 'modules/article/article.module';
// import { BoardModule } from 'modules/board/board.module';
// import { UploadFileModule } from 'modules/upload-file/upload-file.module';
// import { UserModule } from 'modules/users/users.module';
// import { HealthCheckController } from 'modules/health-check/health-check.controller';
import { CategoriesModule } from './categories/categories.module';

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
          dropSchema: false,
          synchronize: false,
          logging: true,
          connectTimeout: 1000,
          extra: { connectionLimit: 30 },
        };
      },
      inject: [ConfigService],
    }),
    TerminusModule,
    UserModule,
    BoardModule,
    AuthModule,
    ArticleModule,
    ArticleCommentModule,
    UploadFileModule,
    UnitOfWorkModule,
    CategoriesModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
