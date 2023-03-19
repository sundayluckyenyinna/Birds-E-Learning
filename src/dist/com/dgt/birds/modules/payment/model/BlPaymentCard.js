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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let BlPaymentCard = class BlPaymentCard {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", String)
], BlPaymentCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_email", type: "varchar" }),
    __metadata("design:type", String)
], BlPaymentCard.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "varchar" }),
    __metadata("design:type", String)
], BlPaymentCard.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "card_no", type: "varchar" }),
    __metadata("design:type", String)
], BlPaymentCard.prototype, "cardNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "expiry_date", type: "varchar" }),
    __metadata("design:type", String)
], BlPaymentCard.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "card_cvv", type: "varchar" }),
    __metadata("design:type", String)
], BlPaymentCard.prototype, "cvv", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "card_type", type: "varchar" }),
    __metadata("design:type", String)
], BlPaymentCard.prototype, "cardType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], BlPaymentCard.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "datetime" }),
    __metadata("design:type", Date)
], BlPaymentCard.prototype, "updatedAt", void 0);
BlPaymentCard = __decorate([
    (0, typeorm_1.Entity)({ name: "bln_payment_card" })
], BlPaymentCard);
exports.default = BlPaymentCard;
//# sourceMappingURL=BlPaymentCard.js.map