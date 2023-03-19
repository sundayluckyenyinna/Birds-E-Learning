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
let BlCourseLesson = class BlCourseLesson {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "section_id", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "sectionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_id", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "content", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "short_desc", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "shortDesc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "duration", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slug", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_id", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "type", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "url", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "preview_url", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "previewUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "active", type: "tinyint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BlCourseLesson.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "display_order", type: "tinyint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BlCourseLesson.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "origin_id", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "originId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lang", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "create_user", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "createUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "update_user", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "updateUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlCourseLesson.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlCourseLesson.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlCourseLesson.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image_id", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourseLesson.prototype, "imageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "icon", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourseLesson.prototype, "icon", void 0);
BlCourseLesson = __decorate([
    (0, typeorm_1.Entity)({ name: "bravo_course_lessons" })
], BlCourseLesson);
exports.default = BlCourseLesson;
//# sourceMappingURL=BlCourseLesson.js.map