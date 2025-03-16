import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { TrimStringsPipe } from "common/transformer/trim-strings.pipe";
import helmet from "helmet";
import * as compression from "compression";
import * as requestIp from "request-ip";
import * as cookieParser from "cookie-parser";
import { urlencoded, json } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("99-F API")
    .setDescription("99-F API description")
    .setVersion("1.0")
    .addTag("99-F")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("document", app, document);
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
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
