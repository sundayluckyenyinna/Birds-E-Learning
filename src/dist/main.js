"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const MessageSource_1 = require("./com/dgt/birds/config/MessageSource");
const common_1 = require("@nestjs/common");
const BirdsExceptionFilter_1 = require("./com/dgt/birds/filter/BirdsExceptionFilter");
const TemplateHandler_1 = require("./com/dgt/birds/config/TemplateHandler");
const ApplicationPropertyConfig_1 = require("./com/dgt/birds/config/ApplicationPropertyConfig");
const process = require("process");
const cookieParser = require("cookie-parser");
const express = require("express");
const express_1 = require("express");
const path = require("path");
const configurablePort = Number(ApplicationPropertyConfig_1.default.getProperty("server.port"));
const bindingPort = Number(process.env.PORT) || configurablePort;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const messageSource = new MessageSource_1.default();
    const config = new swagger_1.DocumentBuilder()
        .setTitle(messageSource.getRawMessage("swagger.title"))
        .setDescription(messageSource.getRawMessage("swagger.desc"))
        .setVersion(messageSource.getRawMessage("swagger.version"))
        .addTag(messageSource.getRawMessage("swagger.tag"))
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(messageSource.getRawMessage("swagger.apiPath"), app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new BirdsExceptionFilter_1.default());
    app.use(cookieParser());
    app.enableCors({ origin: "*", methods: ['GET', 'POST', 'PUT'], credentials: true });
    app.use(express.static(path.join(__dirname, './public')));
    app.use((0, express_1.json)({ limit: "50mb" }));
    await app.listen(bindingPort);
}
bootstrap().then(() => {
    TemplateHandler_1.default.storeTemplatesToZooItemKeeper();
    const logger = new common_1.Logger("Birds-E-Learning");
    logger.log("Datasource properties initialized");
    logger.log("Connected to database successfully");
    logger.log("Application started on port: ".concat(String(bindingPort)));
});
//# sourceMappingURL=main.js.map