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
exports.CompactCourseGraphResponse = exports.CompactCourseGraphResponseData = exports.CourseGraphResponseData = void 0;
const swagger_1 = require("@nestjs/swagger");
const BravoCourseCategory_1 = require("../../model/BravoCourseCategory");
class CourseGraphResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: BravoCourseCategory_1.default }),
    __metadata("design:type", Array)
], CourseGraphResponseData.prototype, "categories", void 0);
exports.CourseGraphResponseData = CourseGraphResponseData;
class CompactCourseGraphResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: BravoCourseCategory_1.default }),
    __metadata("design:type", Array)
], CompactCourseGraphResponseData.prototype, "trendingCategories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: BravoCourseCategory_1.default }),
    __metadata("design:type", Array)
], CompactCourseGraphResponseData.prototype, "preferentialCategories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: BravoCourseCategory_1.default }),
    __metadata("design:type", Array)
], CompactCourseGraphResponseData.prototype, "quickCategories", void 0);
exports.CompactCourseGraphResponseData = CompactCourseGraphResponseData;
class CourseGraphResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseGraphResponse.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseGraphResponse.prototype, "responseMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CourseGraphResponseData)
], CourseGraphResponse.prototype, "categories", void 0);
exports.default = CourseGraphResponse;
class CompactCourseGraphResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CompactCourseGraphResponse.prototype, "responseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CompactCourseGraphResponse.prototype, "responseMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CompactCourseGraphResponseData)
], CompactCourseGraphResponse.prototype, "responseData", void 0);
exports.CompactCourseGraphResponse = CompactCourseGraphResponse;
//# sourceMappingURL=CourseGraphResponse.js.map