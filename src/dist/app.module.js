"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const UserModule_1 = require("./com/dgt/birds/modules/user/UserModule");
const AppConfigModule_1 = require("./com/dgt/birds/config/AppConfigModule");
const MessageSource_1 = require("./com/dgt/birds/config/MessageSource");
const AuthenticationMiddleware_1 = require("./com/dgt/birds/middleware/AuthenticationMiddleware");
const UserSQLRepository_1 = require("./com/dgt/birds/modules/user/repository/UserSQLRepository");
const LoggingMiddleware_1 = require("./com/dgt/birds/middleware/LoggingMiddleware");
const schedule_1 = require("@nestjs/schedule");
const LoggingManagementScheduler_1 = require("./com/dgt/birds/schedulers/LoggingManagementScheduler");
const LoginSQLRepository_1 = require("./com/dgt/birds/modules/user/repository/LoginSQLRepository");
const CourseModule_1 = require("./com/dgt/birds/modules/course/CourseModule");
const PaymentModule_1 = require("./com/dgt/birds/modules/payment/PaymentModule");
const GoogleModule_1 = require("./com/dgt/birds/modules/google/GoogleModule");
const FtpModule_1 = require("./com/dgt/birds/modules/ftp/FtpModule");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(LoggingMiddleware_1.default, AuthenticationMiddleware_1.default)
            .forRoutes({ path: "/**", method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            AppConfigModule_1.default, UserModule_1.default,
            schedule_1.ScheduleModule.forRoot(), CourseModule_1.default, PaymentModule_1.default,
            GoogleModule_1.default, FtpModule_1.default
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService, AuthenticationMiddleware_1.default, UserSQLRepository_1.default,
            MessageSource_1.default, LoggingManagementScheduler_1.default,
            LoginSQLRepository_1.default
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map