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
let UserProfilePicture = class UserProfilePicture {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], UserProfilePicture.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "userEmail", type: "varchar" }),
    __metadata("design:type", String)
], UserProfilePicture.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "varchar" }),
    __metadata("design:type", String)
], UserProfilePicture.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pic_id", type: "varchar" }),
    __metadata("design:type", String)
], UserProfilePicture.prototype, "picId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], UserProfilePicture.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "datetime" }),
    __metadata("design:type", Date)
], UserProfilePicture.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", type: "datetime" }),
    __metadata("design:type", Date)
], UserProfilePicture.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_by", type: "varchar" }),
    __metadata("design:type", String)
], UserProfilePicture.prototype, "modifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "photo_link", type: "varchar" }),
    __metadata("design:type", String)
], UserProfilePicture.prototype, "photoLink", void 0);
UserProfilePicture = __decorate([
    (0, typeorm_1.Entity)({ name: "bln_user_profile_pic" })
], UserProfilePicture);
exports.default = UserProfilePicture;
//# sourceMappingURL=UserProfilePicture.js.map