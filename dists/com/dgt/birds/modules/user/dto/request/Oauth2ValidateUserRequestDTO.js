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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const RequestChannels_1 = require("../../../../const/RequestChannels");
const OauthValidationTypes_1 = require("../../../../const/OauthValidationTypes");
const requestChannels = [RequestChannels_1.RequestChannels.MOBILE, RequestChannels_1.RequestChannels.WEB];
const oauthValidationTypes = [OauthValidationTypes_1.OauthValidationTypes.LOGIN, OauthValidationTypes_1.OauthValidationTypes.SIGNUP];
class Oauth2ValidateUserRequestDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Oauth2ValidateUserRequestDTO.prototype, "consentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Oauth2ValidateUserRequestDTO.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Oauth2ValidateUserRequestDTO.prototype, "authServiceProvider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(requestChannels),
    __metadata("design:type", String)
], Oauth2ValidateUserRequestDTO.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Oauth2ValidateUserRequestDTO.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: "LOGIN" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(oauthValidationTypes),
    __metadata("design:type", String)
], Oauth2ValidateUserRequestDTO.prototype, "oauthValidationType", void 0);
exports.default = Oauth2ValidateUserRequestDTO;
//# sourceMappingURL=Oauth2ValidateUserRequestDTO.js.map