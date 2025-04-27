import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
// import compression from "compression";
import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import { AppModule } from "../src/app.module";
import { TrimStringsPipe } from "../src/common/transformer/trim-strings.pipe";
import helmet from "helmet";
import serverless from "serverless-http";

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: false,
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
  return serverless(server);
}

let handler: any;

const getHandler = async () => {
  if (!handler) {
    handler = await bootstrap();
  }
  return handler;
};

export default async (event: any, context: any) => {
  const server = await getHandler();
  return server(event, context);
};
