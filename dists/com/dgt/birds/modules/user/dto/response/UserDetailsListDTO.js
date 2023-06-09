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
exports.UserDetailsDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const User_1 = require("../../model/User");
class UserDetailsListDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDetailsListDTO.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDetailsListDTO.prototype, "responseMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: User_1.default }),
    __metadata("design:type", Array)
], UserDetailsListDTO.prototype, "responseData", void 0);
exports.default = UserDetailsListDTO;
class UserDetailsDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDetailsDTO.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDetailsDTO.prototype, "responseMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", User_1.default)
], UserDetailsDTO.prototype, "responseData", void 0);
exports.UserDetailsDTO = UserDetailsDTO;
//# sourceMappingURL=UserDetailsListDTO.js.map