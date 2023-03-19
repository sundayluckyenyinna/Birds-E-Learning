/* eslint-disable */
import { Module } from "@nestjs/common";
import ApplicationPropertyConfig from "./ApplicationPropertyConfig";
import AppConfig from "./AppConfig";
import MessageSource from "./MessageSource";

@Module({
  imports:[ApplicationPropertyConfig.ApplicationProperties(), AppConfig.InitSQLDatasourceConfiguration()],
  providers: [MessageSource],
})
export default class AppConfigModule{}