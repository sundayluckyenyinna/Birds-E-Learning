"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const UserController_1 = require("./controller/UserController");
const UserService_1 = require("./service/UserService");
const UserSQLRepository_1 = require("./repository/UserSQLRepository");
const UserNoSQLRepository_1 = require("./repository/UserNoSQLRepository");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("./model/User");
const MessageSource_1 = require("../../config/MessageSource");
const UserAuth_1 = require("./model/UserAuth");
const UserBasicService_1 = require("./service/UserBasicService");
const UserOauthService_1 = require("./service/UserOauthService");
const LoginSQLRepository_1 = require("./repository/LoginSQLRepository");
const UserLogin_1 = require("./model/UserLogin");
const UserBasicServiceUtils_1 = require("./service/UserBasicServiceUtils");
const UserPreferenceSQLRepository_1 = require("../course/repository/UserPreferenceSQLRepository");
const PaymentSQLRepository_1 = require("../payment/repository/PaymentSQLRepository");
const UserProfilePicSQLRepository_1 = require("./repository/UserProfilePicSQLRepository");
const GoogleDriveService_1 = require("../google/service/GoogleDriveService");
const FtpService_1 = require("../ftp/service/FtpService");
const MediaFilesSQLRepository_1 = require("../ftp/repository/MediaFilesSQLRepository");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_1.default, UserAuth_1.default, UserLogin_1.default])],
        controllers: [UserController_1.default],
        providers: [
            UserService_1.default, UserBasicService_1.default, UserOauthService_1.default, UserSQLRepository_1.default,
            UserNoSQLRepository_1.default, LoginSQLRepository_1.default, UserPreferenceSQLRepository_1.default,
            PaymentSQLRepository_1.default, MessageSource_1.default, UserBasicServiceUtils_1.default, UserProfilePicSQLRepository_1.default,
            GoogleDriveService_1.default, FtpService_1.default, MediaFilesSQLRepository_1.default
        ]
    })
], UserModule);
exports.default = UserModule;
//# sourceMappingURL=UserModule.js.map