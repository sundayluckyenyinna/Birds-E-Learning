"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppConfig_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ApplicationPropertyConfig_1 = require("./ApplicationPropertyConfig");
let AppConfig = AppConfig_1 = class AppConfig {
};
AppConfig.configurations = ApplicationPropertyConfig_1.default.loadPropertiesOrFail();
AppConfig.logger = new common_1.Logger("Birds-E-Learning");
AppConfig.InitSQLDatasourceConfiguration = () => {
    const host = AppConfig_1.configurations.birds.datasource.sql.mysql.host;
    const port = AppConfig_1.configurations.birds.datasource.sql.mysql.port;
    const username = AppConfig_1.configurations.birds.datasource.sql.mysql.username;
    const password = AppConfig_1.configurations.birds.datasource.sql.mysql.password;
    const databaseName = AppConfig_1.configurations.birds.datasource.sql.mysql.database;
    AppConfig_1.logger.log("Application profile set to: ".concat(ApplicationPropertyConfig_1.default.profile));
    AppConfig_1.logger.log("Initializing datasource configurations");
    const datasourceRootModule = typeorm_1.TypeOrmModule.forRoot({
        type: 'mysql',
        host: host,
        port: Number(port),
        username: username,
        password: password,
        database: databaseName,
        autoLoadEntities: true
    });
    AppConfig_1.logger.log("Datasource properties picked in configuration file");
    AppConfig_1.logger.log("Datasource host: ".concat(host));
    AppConfig_1.logger.log("Datasource port: ".concat(port));
    AppConfig_1.logger.log("Datasource username: ".concat(username));
    AppConfig_1.logger.log("Datasource database name: ".concat(databaseName));
    return datasourceRootModule;
};
AppConfig = AppConfig_1 = __decorate([
    (0, common_1.Injectable)()
], AppConfig);
exports.default = AppConfig;
//# sourceMappingURL=AppConfig.js.map