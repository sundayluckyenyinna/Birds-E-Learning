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
exports.AutomaticLoginRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const OauthChannels_1 = require("../../../../const/OauthChannels");
const loginDomains = [OauthChannels_1.OauthChannels.LOCAL_DOMAIN, OauthChannels_1.OauthChannels.GOOGLE, OauthChannels_1.OauthChannels.FACEBOOK, OauthChannels_1.OauthChannels.APPLE];
class LoginUserRequestDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User's email", default: "user@gmail.com", type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginUserRequestDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User's password", default: "password!23", type: String }),
    __metadata("design:type", String)
], LoginUserRequestDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The user login channel", default: "MOBILE", type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginUserRequestDTO.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User device Id", type: String }),
    __metadata("design:type", String)
], LoginUserRequestDTO.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Remember me field ", type: Boolean }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LoginUserRequestDTO.prototype, "rememberMe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The mode of login", type: String, default: loginDomains[0] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(loginDomains),
    __metadata("design:type", String)
], LoginUserRequestDTO.prototype, "loginBy", void 0);
exports.default = LoginUserRequestDTO;
class AutomaticLoginRequestDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AutomaticLoginRequestDTO.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AutomaticLoginRequestDTO.prototype, "channel", void 0);
exports.AutomaticLoginRequestDTO = AutomaticLoginRequestDTO;
//# sourceMappingURL=LoginUserRequestDTO.js.map