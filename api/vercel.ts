import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import serverless from "serverless-http";

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
