/* eslint-disable */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import UserModule from "./com/dgt/birds/modules/user/UserModule";
import AppConfigModule from "./com/dgt/birds/config/AppConfigModule";
import MessageSource from "./com/dgt/birds/config/MessageSource";
import AuthenticationMiddleware from "./com/dgt/birds/middleware/AuthenticationMiddleware";
import UserSQLRepository from "./com/dgt/birds/modules/user/repository/UserSQLRepository";
import LoggingMiddleware from "./com/dgt/birds/middleware/LoggingMiddleware";
import { ScheduleModule } from "@nestjs/schedule";
import LoggingManagementScheduler from "./com/dgt/birds/schedulers/LoggingManagementScheduler";
import LoginSQLRepository from "./com/dgt/birds/modules/user/repository/LoginSQLRepository";
import CourseModule from "./com/dgt/birds/modules/course/CourseModule";
import PaymentModule from "./com/dgt/birds/modules/payment/PaymentModule";
import * as path from "path";
import * as process from "process";
import GoogleModule from "./com/dgt/birds/modules/google/GoogleModule";
import FtpModule from "./com/dgt/birds/modules/ftp/FtpModule";

@Module({
  imports: [
    AppConfigModule, UserModule,
    ScheduleModule.forRoot(), CourseModule, PaymentModule,
    GoogleModule, FtpModule
  ],
  controllers: [AppController],
  providers: [
    AppService, AuthenticationMiddleware, UserSQLRepository,
    MessageSource, LoggingManagementScheduler,
    LoginSQLRepository
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggingMiddleware, AuthenticationMiddleware)
      .forRoutes({path: "/**", method: RequestMethod.ALL});
  }

}
