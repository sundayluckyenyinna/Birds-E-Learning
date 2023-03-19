/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import MessageSource from "./com/dgt/birds/config/MessageSource";
import { Logger, ValidationPipe } from "@nestjs/common";
import BirdsExceptionFilter from "./com/dgt/birds/filter/BirdsExceptionFilter";
import TemplateHandler from "./com/dgt/birds/config/TemplateHandler";
import ApplicationPropertyConfig from "./com/dgt/birds/config/ApplicationPropertyConfig";
import * as process from "process";
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { urlencoded, json } from "express";
import * as path from "path";
import GoogleDriveUtil from "./com/dgt/birds/utils/google/GoogleDriveUtil";
import GoogleDriveServiceUtils from "./com/dgt/birds/utils/google/GoogleDriveServiceUtils";



// Configure the port.
const configurablePort: number = Number(ApplicationPropertyConfig.getProperty("server.port"));
const bindingPort: number = Number(process.env.PORT) || configurablePort;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const messageSource: MessageSource = new MessageSource();
  const config = new DocumentBuilder()
    .setTitle(messageSource.getRawMessage("swagger.title"))
    .setDescription(messageSource.getRawMessage("swagger.desc"))
    .setVersion(messageSource.getRawMessage("swagger.version"))
    .addTag(messageSource.getRawMessage("swagger.tag"))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(messageSource.getRawMessage("swagger.apiPath"), app, document);

  // Validation configuration.
  app.useGlobalPipes(new ValidationPipe());

  // Bad request body exception filter configuration.
  app.useGlobalFilters(new BirdsExceptionFilter());

  // Use cookie-parser middle-ware.
  app.use(cookieParser())

  app.enableCors({ origin: "*", methods: ['GET', 'POST', 'PUT'], credentials: true });

  // Server static files in public folder of root project directory.
  app.use(express.static(path.join(__dirname, './public')));
  app.use(json({ limit: "50mb" }));
  // Configure the binding ports.
  await app.listen(bindingPort);
}
bootstrap().then(() => {
   TemplateHandler.storeTemplatesToZooItemKeeper();
   const logger: Logger = new Logger("Birds-E-Learning");
   logger.log("Datasource properties initialized");
   logger.log("Connected to database successfully");
   logger.log("Application started on port: ".concat(String(bindingPort)));
});