"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const trim_strings_pipe_1 = require("./common/transformer/trim-strings.pipe");
const helmet_1 = require("helmet");
const compression = require("compression");
const requestIp = require("request-ip");
const cookieParser = require("cookie-parser");
const express_1 = require("express");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new trim_strings_pipe_1.TrimStringsPipe(), new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use(requestIp.mw());
    app.use(compression());
    app.use((0, express_1.json)({ limit: "50mb" }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: "50mb" }));
    app.use(cookieParser());
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: true,
        methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS,PATCH",
        credentials: true,
    });
    await app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map