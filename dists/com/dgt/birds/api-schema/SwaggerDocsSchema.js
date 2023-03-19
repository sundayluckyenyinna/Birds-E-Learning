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
exports.Oauth2ConsentUrlDTO = exports.Oauth2ConsentUrlData = exports.BadRequestResponseDTO = exports.InternalServerErrorResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class InternalServerErrorResponseDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: "99" }),
    __metadata("design:type", String)
], InternalServerErrorResponseDTO.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: "Internal system error. Please contact administrator or support" }),
    __metadata("design:type", String)
], InternalServerErrorResponseDTO.prototype, "responseMessage", void 0);
exports.InternalServerErrorResponseDTO = InternalServerErrorResponseDTO;
class BadRequestResponseDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: "08", type: String }),
    __metadata("design:type", String)
], BadRequestResponseDTO.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: "Email cannot be empty", type: String }),
    __metadata("design:type", String)
], BadRequestResponseDTO.prototype, "responseMessage", void 0);
exports.BadRequestResponseDTO = BadRequestResponseDTO;
class Oauth2ConsentUrlData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Oauth2ConsentUrlData.prototype, "authorizationConsentUrl", void 0);
exports.Oauth2ConsentUrlData = Oauth2ConsentUrlData;
class Oauth2ConsentUrlDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Oauth2ConsentUrlDTO.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Oauth2ConsentUrlDTO.prototype, "responseMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Oauth2ConsentUrlData)
], Oauth2ConsentUrlDTO.prototype, "responseData", void 0);
exports.Oauth2ConsentUrlDTO = Oauth2ConsentUrlDTO;
//# sourceMappingURL=SwaggerDocsSchema.js.map