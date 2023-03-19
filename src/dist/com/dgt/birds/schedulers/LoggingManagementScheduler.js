"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LoggingManagementScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const LoggerFactory_1 = require("../config/LoggerFactory");
const schedule_1 = require("@nestjs/schedule");
const UserSQLRepository_1 = require("../modules/user/repository/UserSQLRepository");
const LoginSQLRepository_1 = require("../modules/user/repository/LoginSQLRepository");
let LoggingManagementScheduler = LoggingManagementScheduler_1 = class LoggingManagementScheduler {
    constructor(userRepository, loginRepository) {
        this.userRepository = userRepository;
        this.loginRepository = loginRepository;
        this.logger = LoggerFactory_1.default.createLogger(LoggingManagementScheduler_1.name);
    }
    performHouseKeeping() {
        this.cleanupLoggingRecords()
            .then(() => this.logger.info("Cleanup of users log record completed."));
        this.invalidateExpiredRememberMe()
            .then(() => this.logger.info("Expired RememberMe features invalidation completed."));
    }
    async cleanupLoggingRecords() {
        const emails = await this.loginRepository
            .createQueryBuilder("bln_user_login")
            .select("user_email as userEmail")
            .distinct(true)
            .execute();
        console.log(emails[0].userEmail);
        const userLoginRecords = await this.loginRepository.find();
        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];
            let perUserLogin = userLoginRecords
                .filter((record) => record.userEmail === email.userEmail)
                .sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());
            perUserLogin.pop();
            await this.loginRepository.remove(perUserLogin);
        }
    }
    async invalidateExpiredRememberMe() {
        const users = (await this.userRepository.find())
            .filter((user) => user.rememberMeActive);
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const partial = {
                rememberMeActive: false,
                rememberMeCreatedDate: undefined,
                rememberMeExpDate: undefined
            };
            await this.userRepository.updateUser(user, partial);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoggingManagementScheduler.prototype, "performHouseKeeping", null);
LoggingManagementScheduler = LoggingManagementScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserSQLRepository_1.default,
        LoginSQLRepository_1.default])
], LoggingManagementScheduler);
exports.default = LoggingManagementScheduler;
//# sourceMappingURL=LoggingManagementScheduler.js.map