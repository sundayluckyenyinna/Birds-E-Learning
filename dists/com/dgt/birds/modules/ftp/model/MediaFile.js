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
let MediaFile = class MediaFile {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], MediaFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_name", type: "varchar" }),
    __metadata("design:type", String)
], MediaFile.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_path", type: "varchar" }),
    __metadata("design:type", String)
], MediaFile.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_size", type: "varchar" }),
    __metadata("design:type", String)
], MediaFile.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_type", type: "varchar" }),
    __metadata("design:type", String)
], MediaFile.prototype, "fileType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_extension", type: "varchar" }),
    __metadata("design:type", String)
], MediaFile.prototype, "fileExtension", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "create_user", type: "int" }),
    __metadata("design:type", Number)
], MediaFile.prototype, "createUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "update_user", type: "int" }),
    __metadata("design:type", Number)
], MediaFile.prototype, "updateUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", type: "timestamp" }),
    __metadata("design:type", Date)
], MediaFile.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "app_id", type: "int" }),
    __metadata("design:type", Object)
], MediaFile.prototype, "appId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "app_user_id", type: "int" }),
    __metadata("design:type", Number)
], MediaFile.prototype, "appUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_width", type: "int" }),
    __metadata("design:type", Number)
], MediaFile.prototype, "fileWidth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_height", type: "int" }),
    __metadata("design:type", Number)
], MediaFile.prototype, "fileHeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], MediaFile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], MediaFile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "driver", type: "varchar" }),
    __metadata("design:type", String)
], MediaFile.prototype, "driver", void 0);
MediaFile = __decorate([
    (0, typeorm_1.Entity)({ name: "media_files" })
], MediaFile);
exports.default = MediaFile;
//# sourceMappingURL=MediaFile.js.map