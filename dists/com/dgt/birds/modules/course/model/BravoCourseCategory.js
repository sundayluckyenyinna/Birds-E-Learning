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
const BlCourse_1 = require("./BlCourse");
let BravoCourseCategory = class BravoCourseCategory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], BravoCourseCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BravoCourseCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image_id", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BravoCourseCategory.prototype, "imageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "content", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BravoCourseCategory.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slug", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BravoCourseCategory.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BravoCourseCategory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "_lft", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BravoCourseCategory.prototype, "_lft", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "_rgt", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BravoCourseCategory.prototype, "_rgt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "parent_id", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BravoCourseCategory.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "create_user", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BravoCourseCategory.prototype, "createUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "update_user", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BravoCourseCategory.prototype, "updateUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BravoCourseCategory.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "origin_id", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BravoCourseCategory.prototype, "originId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lang", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BravoCourseCategory.prototype, "lang", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BravoCourseCategory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BravoCourseCategory.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: BlCourse_1.default }),
    __metadata("design:type", Array)
], BravoCourseCategory.prototype, "courses", void 0);
BravoCourseCategory = __decorate([
    (0, typeorm_1.Entity)({ name: "bravo_course_category" })
], BravoCourseCategory);
exports.default = BravoCourseCategory;
//# sourceMappingURL=BravoCourseCategory.js.map