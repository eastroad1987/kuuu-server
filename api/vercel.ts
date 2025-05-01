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

const server = express();

let app: any;
let serverlessHandler: any;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
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
  }
  
  if (!serverlessHandler) {
    serverlessHandler = serverless(server);
  }
  
  return serverlessHandler;
}

export default async (req: any, res: any) => {
  const handler = await bootstrap();
  return handler(req, res);
};
