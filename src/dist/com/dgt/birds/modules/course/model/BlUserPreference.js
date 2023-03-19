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
const swagger_1 = require("@nestjs/swagger");
let BlUserPreference = class BlUserPreference {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlUserPreference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlUserPreference.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_email", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlUserPreference.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "preference_names", type: "simple-json" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], BlUserPreference.prototype, "preferenceNames", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlUserPreference.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "datetime" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlUserPreference.prototype, "updatedDate", void 0);
BlUserPreference = __decorate([
    (0, typeorm_1.Entity)({ name: "bln_user_preferences" })
], BlUserPreference);
exports.default = BlUserPreference;
//# sourceMappingURL=BlUserPreference.js.map