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
const BlCourseLesson_1 = require("./BlCourseLesson");
let BlCourse = class BlCourse {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], BlCourse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slug", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "content", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image_id", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "imageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "banner_image_id", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "bannerImageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "short_desc", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "shortDesc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_featured", type: "tinyint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BlCourse.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gallery", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "gallery", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "video", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "price", type: "decimal" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "sale_price", type: "decimal" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "duration", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "faqs", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "faqs", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "publish_date", type: "datetime" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlCourse.prototype, "publishDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "create_user", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "createUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "update_user", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "updateUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlCourse.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "views", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlCourse.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "timestamp" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BlCourse.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "default_state", type: "tinyint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "defaultState", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "review_score", type: "decimal" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlCourse.prototype, "reviewScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "include", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "include", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "exclude", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "exclude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "itinerary", type: "text" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlCourse.prototype, "itinerary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: BlCourseLesson_1.default }),
    __metadata("design:type", Array)
], BlCourse.prototype, "lessons", void 0);
BlCourse = __decorate([
    (0, typeorm_1.Entity)({ name: "bravo_courses" })
], BlCourse);
exports.default = BlCourse;
//# sourceMappingURL=BlCourse.js.map