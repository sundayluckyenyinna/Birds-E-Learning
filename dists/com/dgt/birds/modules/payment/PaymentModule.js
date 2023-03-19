"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const PaymentController_1 = require("./controller/PaymentController");
const PaymentService_1 = require("./service/PaymentService");
const typeorm_1 = require("@nestjs/typeorm");
const BlPaymentCard_1 = require("./model/BlPaymentCard");
const UserSQLRepository_1 = require("../user/repository/UserSQLRepository");
const PaymentSQLRepository_1 = require("./repository/PaymentSQLRepository");
const MessageSource_1 = require("../../config/MessageSource");
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([BlPaymentCard_1.default])],
        controllers: [PaymentController_1.default],
        providers: [PaymentService_1.default, UserSQLRepository_1.default, PaymentSQLRepository_1.default, MessageSource_1.default]
    })
], PaymentModule);
exports.default = PaymentModule;
//# sourceMappingURL=PaymentModule.js.map