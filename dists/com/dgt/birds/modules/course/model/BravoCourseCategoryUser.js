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
let BravoCourseCategoryUser = class BravoCourseCategoryUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], BravoCourseCategoryUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_id", type: "bigint" }),
    __metadata("design:type", Number)
], BravoCourseCategoryUser.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "bigint" }),
    __metadata("design:type", Number)
], BravoCourseCategoryUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "active", type: "boolean" }),
    __metadata("design:type", Boolean)
], BravoCourseCategoryUser.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "order_id", type: "bigint" }),
    __metadata("design:type", Number)
], BravoCourseCategoryUser.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", type: "timestamp" }),
    __metadata("design:type", Date)
], BravoCourseCategoryUser.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "create_user", type: "bigint" }),
    __metadata("design:type", Number)
], BravoCourseCategoryUser.prototype, "createUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "update_user", type: "bigint" }),
    __metadata("design:type", Number)
], BravoCourseCategoryUser.prototype, "updateUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], BravoCourseCategoryUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], BravoCourseCategoryUser.prototype, "updatedAt", void 0);
BravoCourseCategoryUser = __decorate([
    (0, typeorm_1.Entity)({ name: "bravo_course_user" })
], BravoCourseCategoryUser);
exports.default = BravoCourseCategoryUser;
//# sourceMappingURL=BravoCourseCategoryUser.js.map