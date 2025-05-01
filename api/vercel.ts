import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import helmet from "helmet";
import serverless from "serverless-http";
import { AppModule } from "../src/app.module";

// 서버리스 환경 설정
process.env.NODE_ENV = "production";

// 전역 인스턴스 캐싱
let app;
let server;
let serverlessHandler;

// 최소한의 부트스트랩 과정만 수행
async function bootstrap() {
  // 서버 인스턴스 재사용
  if (!server) {
    server = express();
  }

  // NestJS 앱 인스턴스 재사용
  if (!app) {
    // 로깅 완전 비활성화 및 최소한의 옵션만 사용
    app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      logger: false,
      abortOnError: false,
      bodyParser: false,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );

    // 최소한의 필수 미들웨어만 사용
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true, limit: "1mb" }));
    app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );

    app.enableCors({
      origin: true,
      methods: "GET,HEAD,PUT,POST,DELETE",
    });

    app.setGlobalPrefix("api");

    // 앱 초기화 (listen 하지 않음)
    await app.init();
  }

  // 서버리스 핸들러 재사용
  if (!serverlessHandler) {
    serverlessHandler = serverless(server);
  }

  return serverlessHandler;
}

// 요청 타임아웃 설정 (50초) - Vercel 최대 60초보다 조금 짧게 설정
const TIMEOUT = 50000;

// 서버리스 함수 핸들러
export default async (req, res) => {
  // 타임아웃 처리
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Function execution timed out"));
    }, TIMEOUT);
  });

  // 요청 처리
  const handlerPromise = (async () => {
    try {
      const handler = await bootstrap();
      return handler(req, res);
    } catch (error) {
      console.error("Serverless handler error:", error);
      res.status(500).send("Internal Server Error");
    }
  })();

  // 타임아웃과 함께 경쟁
  try {
    await Promise.race([handlerPromise, timeoutPromise]);
  } catch (/* eslint-disable-next-line @typescript-eslint/no-unused-vars */error) {
    if (!res.headersSent) {
      res.status(408).send("Request Timeout");
    }
  }
};
