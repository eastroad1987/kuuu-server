import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { TrimStringsPipe } from "./common/transformer/trim-strings.pipe";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import express from "express";
import { json, urlencoded } from "express";
import helmet from "helmet";
import * as requestIp from "request-ip";
import { AppModule } from "./app.module";

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
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
  
  app.use(requestIp.mw());
  app.use(compression());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS,PATCH",
    credentials: true,
  });
  // await app.listen(process.env.PORT ?? 4000);
  app.setGlobalPrefix("api");
  await app.init();
}
bootstrap();

export const handler = server;
