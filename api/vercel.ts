import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
  return expressApp;
}

let server: any;
export const handler = async (event: any, context: any) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context);
};
