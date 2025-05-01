"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_module_1 = require("../src/app.module");
process.env.NODE_ENV = "production";
let app;
let server;
let serverlessHandler;
async function bootstrap() {
    if (!server) {
        server = (0, express_1.default)();
    }
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server), {
            logger: false,
            abortOnError: false,
            bodyParser: false,
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }));
        app.use(express_1.default.json({ limit: "1mb" }));
        app.use(express_1.default.urlencoded({ extended: true, limit: "1mb" }));
        app.use((0, helmet_1.default)({
            contentSecurityPolicy: false,
        }));
        app.enableCors({
            origin: true,
            methods: "GET,HEAD,PUT,POST,DELETE",
        });
        app.setGlobalPrefix("api");
        await app.init();
    }
    if (!serverlessHandler) {
        serverlessHandler = (0, serverless_http_1.default)(server);
    }
    return serverlessHandler;
}
const TIMEOUT = 50000;
exports.default = async (req, res) => {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Function execution timed out"));
        }, TIMEOUT);
    });
    const handlerPromise = (async () => {
        try {
            const handler = await bootstrap();
            return handler(req, res);
        }
        catch (error) {
            console.error("Serverless handler error:", error);
            res.status(500).send("Internal Server Error");
        }
    })();
    try {
        await Promise.race([handlerPromise, timeoutPromise]);
    }
    catch (_) {
        if (!res.headersSent) {
            res.status(408).send("Request Timeout");
        }
    }
};
