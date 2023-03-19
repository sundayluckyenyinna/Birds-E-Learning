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
const UserGender_1 = require("../../constants/UserGender");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const RequestChannels_1 = require("../../../../const/RequestChannels");
const OauthChannels_1 = require("../../../../const/OauthChannels");
const signupDomains = [OauthChannels_1.OauthChannels.LOCAL_DOMAIN, OauthChannels_1.OauthChannels.GOOGLE, OauthChannels_1.OauthChannels.FACEBOOK, OauthChannels_1.OauthChannels.APPLE];
class CreateUserRequestDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's first name", required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's last name", required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's middle name", required: false }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's home address", required: false }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's email address", required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "emailAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's mobile's number", required: false }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "mobileNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's date of birth", required: false }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array, description: "User's role", required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateUserRequestDTO.prototype, "userRoles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's first name", required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's password", required: true }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's photo in BASE-64", required: false }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's mobile deviceId or IMEI", required: false }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's geo location", required: false, default: "(1.35, 5.67)" }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "geoLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's gender", required: false, default: "Male" }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's language", required: false, default: "English" }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's city", required: false, default: "Akoka" }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's country", required: false, default: "Nigeria" }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "User's signup channel", required: true, default: "MOBILE" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([RequestChannels_1.RequestChannels.MOBILE, RequestChannels_1.RequestChannels.WEB]),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: "Flag for remember me feature" }),
    __metadata("design:type", Boolean)
], CreateUserRequestDTO.prototype, "rememberMe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "The channel of signup", default: signupDomains[0], example: signupDomains[1] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(signupDomains),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "signupBy", void 0);
exports.default = CreateUserRequestDTO;
//# sourceMappingURL=CreateUserRequestDTO.js.map