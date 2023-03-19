"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const UserSQLRepository_1 = require("../user/repository/UserSQLRepository");
const FtpService_1 = require("./service/FtpService");
const MediaFilesSQLRepository_1 = require("./repository/MediaFilesSQLRepository");
const typeorm_1 = require("@nestjs/typeorm");
const MediaFile_1 = require("./model/MediaFile");
const MessageSource_1 = require("../../config/MessageSource");
let FtpModule = class FtpModule {
};
FtpModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([MediaFile_1.default])],
        providers: [UserSQLRepository_1.default, FtpService_1.default, MediaFilesSQLRepository_1.default, MessageSource_1.default]
    })
], FtpModule);
exports.default = FtpModule;
//# sourceMappingURL=FtpModule.js.map