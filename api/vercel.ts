import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import serverless from "serverless-http";
import { TrimStringsPipe } from "../src/common/transformer/trim-strings.pipe";
import { ValidationPipe } from "@nestjs/common";

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

let server: any;

async function bootstrap() {
  if (!server) {
    const app = await NestFactory.create(AppModule, adapter, {
      logger: false,
      abortOnError: false,
    });
    app.enableCors();
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
    app.enableCors({
      origin: true,
      methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS,PATCH",
      credentials: true,
    });
    // await app.listen(process.env.PORT ?? 4000);
    app.setGlobalPrefix("api");
    await app.init();
    server = serverless(expressApp);
  }
  return server;
}

const handler = async (event: any, context: any) => {
  const server = await bootstrap();
  return server(event, context);
};

export default handler;
