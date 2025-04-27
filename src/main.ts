import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
// import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import { AppModule } from "./app.module";
import { TrimStringsPipe } from "./common/transformer/trim-strings.pipe";
import helmet from "helmet";
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

  // app.use(requestIp.mw());
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
  await app.listen(process.env.PORT ?? 3000);
  app.setGlobalPrefix("api");
  await app.init();
}
bootstrap();

export const handler = server;
