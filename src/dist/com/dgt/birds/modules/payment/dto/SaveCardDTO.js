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
exports.PaymentCardList = exports.SaveUserCardResponseDTO = exports.SaveUserCardRequestDTO = exports.SaveOrRemoveUserResponseData = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveOrRemoveUserResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveOrRemoveUserResponseData.prototype, "userEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveOrRemoveUserResponseData.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveOrRemoveUserResponseData.prototype, "cardNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveOrRemoveUserResponseData.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveOrRemoveUserResponseData.prototype, "cvv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveOrRemoveUserResponseData.prototype, "cardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SaveOrRemoveUserResponseData.prototype, "createdDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SaveOrRemoveUserResponseData.prototype, "updatedAt", void 0);
exports.SaveOrRemoveUserResponseData = SaveOrRemoveUserResponseData;
class SaveUserCardRequestDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveUserCardRequestDTO.prototype, "cardNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveUserCardRequestDTO.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveUserCardRequestDTO.prototype, "cvv", void 0);
exports.SaveUserCardRequestDTO = SaveUserCardRequestDTO;
class SaveUserCardResponseDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveUserCardResponseDTO.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaveUserCardResponseDTO.prototype, "responseMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", SaveOrRemoveUserResponseData)
], SaveUserCardResponseDTO.prototype, "responseData", void 0);
exports.SaveUserCardResponseDTO = SaveUserCardResponseDTO;
class PaymentCardList {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PaymentCardList.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PaymentCardList.prototype, "responseMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: SaveOrRemoveUserResponseData }),
    __metadata("design:type", Array)
], PaymentCardList.prototype, "responseData", void 0);
exports.PaymentCardList = PaymentCardList;
//# sourceMappingURL=SaveCardDTO.js.map