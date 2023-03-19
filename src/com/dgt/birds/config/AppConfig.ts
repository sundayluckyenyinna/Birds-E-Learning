/* eslint-disable */

import { DynamicModule, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ApplicationPropertyConfig from "./ApplicationPropertyConfig";

/**
 * This class provides all configuration modules that must be available for the lifespan of the application.
 */
@Injectable()
export default class AppConfig
{
  static configurations: Record<string, any> = ApplicationPropertyConfig.loadPropertiesOrFail();

  static logger: Logger = new Logger("Birds-E-Learning");

  /**
   * Provides the SQL database DataSource configuration properties wrapped around a module.
   * @constructor
   */
  static InitSQLDatasourceConfiguration = (): DynamicModule => {

      const host: string = AppConfig.configurations.birds.datasource.sql.mysql.host;
      const port: string = AppConfig.configurations.birds.datasource.sql.mysql.port;
      const username: string = AppConfig.configurations.birds.datasource.sql.mysql.username;
      const password: string = AppConfig.configurations.birds.datasource.sql.mysql.password;
      const databaseName: string = AppConfig.configurations.birds.datasource.sql.mysql.database;

      // Log the initialization step to the logger.
      AppConfig.logger.log("Application profile set to: ".concat(ApplicationPropertyConfig.profile))
      AppConfig.logger.log("Initializing datasource configurations");

      const datasourceRootModule: DynamicModule = TypeOrmModule.forRoot({
        type: 'mysql',
        host: host,
        port: Number(port),
        username: username,
        password: password,
        database: databaseName,
        autoLoadEntities: true
      });

      AppConfig.logger.log("Datasource properties picked in configuration file");
      AppConfig.logger.log("Datasource host: ".concat(host));
      AppConfig.logger.log("Datasource port: ".concat(port));
      AppConfig.logger.log("Datasource username: ".concat(username));
      AppConfig.logger.log("Datasource database name: ".concat(databaseName));

      return datasourceRootModule;
  }


}