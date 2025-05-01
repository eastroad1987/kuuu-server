"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const user_module_1 = require("./modules/user/user.module");
const upload_file_module_1 = require("./modules/upload-file/upload-file.module");
const unitofwork_module_1 = require("./common/unit-of-work/unitofwork.module");
const auth_module_1 = require("./auth/auth.module");
const category_module_1 = require("./modules/category/category.module");
const comment_module_1 = require("./modules/comment/comment.module");
const post_module_1 = require("./modules/post/post.module");
const sub_category_module_1 = require("./modules/sub-category/sub-category.module");
let AppModule = class AppModule {
    configure(consumer) {
        if (process.env.NODE_ENV !== "production") {
            consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({ path: "*", method: common_1.RequestMethod.ALL });
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV === "prod" ? ".env.prod" :
                    process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
                isGlobal: true,
                cache: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        type: "postgres",
                        timezone: "+09:00",
                        host: configService.get("MYSQL_HOST"),
                        port: configService.get("MYSQL_PORT"),
                        username: configService.get("MYSQL_USER"),
                        password: configService.get("MYSQL_PASSWORD"),
                        database: configService.get("MYSQL_DATABASE"),
                        entities: [__dirname + "/**/*.entity{.ts,.js}"],
                        ssl: true,
                        dropSchema: false,
                        synchronize: false,
                        logging: false,
                        connectTimeout: 5000,
                        extra: {
                            connectionLimit: 1,
                            idleTimeoutMillis: 5000,
                            connectionTimeoutMillis: 2000,
                            keepAlive: true,
                            keepAliveInitialDelay: 1000,
                        },
                        poolSize: 1,
                        autoLoadEntities: true,
                        retryAttempts: 1,
                        retryDelay: 1000,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            sub_category_module_1.SubCategoryModule,
            comment_module_1.CommentModule,
            post_module_1.PostModule,
            upload_file_module_1.UploadFileModule,
            unitofwork_module_1.UnitOfWorkModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, { provide: core_1.APP_INTERCEPTOR, useClass: common_1.ClassSerializerInterceptor }],
    })
], AppModule);
