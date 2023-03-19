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
let BlCourseRegistration = class BlCourseRegistration {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], BlCourseRegistration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_reg_id", type: "uuid" }),
    __metadata("design:type", String)
], BlCourseRegistration.prototype, "courseRegId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_reg_date", type: "datetime" }),
    __metadata("design:type", Date)
], BlCourseRegistration.prototype, "courseRegDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_reg_user_id", type: "uuid" }),
    __metadata("design:type", String)
], BlCourseRegistration.prototype, "courseRegUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_reg_channel", type: "varchar" }),
    __metadata("design:type", String)
], BlCourseRegistration.prototype, "courseRegChannel", void 0);
BlCourseRegistration = __decorate([
    (0, typeorm_1.Entity)({ name: "bl_course_registration" })
], BlCourseRegistration);
exports.default = BlCourseRegistration;
//# sourceMappingURL=BlCourseRegistration.js.map