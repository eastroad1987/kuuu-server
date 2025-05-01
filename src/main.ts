import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
// import * as compression from "compression";
import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import { AppModule } from "./app.module";
import { TrimStringsPipe } from "./common/transformer/trim-strings.pipe";
import helmet from "helmet";

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: ["error", "warn"],
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

  // app.use(compression());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS,PATCH",
    credentials: true,
  });
  app.setGlobalPrefix("api");

  await app.init();
  return server;
}

// 서버리스 환경에서는 listen 대신 init만 호출
if (process.env.NODE_ENV !== "production") {
  bootstrap().then(() => {
    console.log("서버가 시작되었습니다.");
  });
}

export default bootstrap();
