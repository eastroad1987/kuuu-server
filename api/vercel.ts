import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
// import compression from "compression";
import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import serverless from "serverless-http";
import { AppModule } from "../src/app.module";
import { TrimStringsPipe } from "../src/common/transformer/trim-strings.pipe";
// import { handler } from '../src/main';

// 글로벌 인스턴스 캐싱 (콜드 스타트 시간 단축)
let app: any;
let server: any;
let serverlessHandler: any;

async function bootstrap() {
  if (!server) {
    server = express();
  }

  if (!app) {
    // 로깅 최소화 및 초기화 속도 향상
    app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      logger: ["error"],
      abortOnError: false,
    });

    app.useGlobalPipes(
      new TrimStringsPipe(),
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );

    // 필수 미들웨어만 사용
    app.use(json({ limit: "10mb" }));
    app.use(urlencoded({ extended: true, limit: "10mb" }));
    app.use(cookieParser());
    app.use(helmet());
    app.enableCors({
      origin: true,
      methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS,PATCH",
      credentials: true,
    });
    app.setGlobalPrefix("api");
    await app.init();
  }

  if (!serverlessHandler) {
    serverlessHandler = serverless(server);
  }

  return serverlessHandler;
}

export default async (req: any, res: any) => {
  // 요청 처리 시간 단축을 위한 최적화
  try {
    const handler = await bootstrap();
    return handler(req, res);
  } catch (error) {
    console.error("Serverless handler error:", error);
    res.status(500).send("Internal Server Error");
  }
};
