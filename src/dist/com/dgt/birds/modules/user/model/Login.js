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
const LoginBuilder_1 = require("../builder/LoginBuilder");
let Login = class Login {
};
Login.builder = () => new LoginBuilder_1.default();
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", type: "bigint" }),
    __metadata("design:type", Number)
], Login.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    __metadata("design:type", String)
], Login.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_email", type: "varchar" }),
    __metadata("design:type", String)
], Login.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "username", type: "varchar" }),
    __metadata("design:type", String)
], Login.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_date", type: "datetime" }),
    __metadata("design:type", Date)
], Login.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "channel", type: "varchar" }),
    __metadata("design:type", String)
], Login.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "auth_token", type: "longtext" }),
    __metadata("design:type", String)
], Login.prototype, "loginAuthToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "auth_token_created_date", type: "datetime" }),
    __metadata("design:type", Date)
], Login.prototype, "loginAuthTokenCreatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "auth_token_exp_date", type: "datetime" }),
    __metadata("design:type", Date)
], Login.prototype, "loginAuthTokenExpDate", void 0);
Login = __decorate([
    (0, typeorm_1.Entity)({ name: "bln_user_login" })
], Login);
exports.default = Login;
//# sourceMappingURL=Login.js.map