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
const UserStatus_1 = require("../constants/UserStatus");
const UserBuilder_1 = require("../builder/UserBuilder");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
};
User.builder = () => new UserBuilder_1.default();
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", type: "bigint" }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "middle_name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "emailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email_verified_at", type: "datetime" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "emailVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "password", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address2", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "address2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "birthday", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "city", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "state", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "country", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "zip_code", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_login_at", type: "datetime" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "lastLoginDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "avatar_id", type: "bigint" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "avatarId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bio", type: "longtext" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", type: "varchar", default: UserStatus_1.UserStatus.UNVERIFIED }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "create_user", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "createUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "update_user", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "updateUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "vendor_commission_amount", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "vendorCommissionAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "vendor_commission_type", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "vendorCommissionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "education", type: "simple-array" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], User.prototype, "education", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "experience", type: "simple-array" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], User.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "social_media", type: "simple-json" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], User.prototype, "socialMedia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_first_name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "billingFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_last_name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "billingLastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_address", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "billingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_address2", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "billingAddress2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_phone", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "billingPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_city", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "billingCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_state", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "billingState", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_country", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "billingCountry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "billing_zip_code", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "billingZipCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", type: "datetime" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remember_token", type: "longtext" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "authToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", type: "datetime" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "payment_gateway", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "paymentGateway", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_guests", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "totalGuest", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "verify_submit_status", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "verifySubmitStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_verified", type: "boolean" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_name", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "locale", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "locale", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_roles", type: "simple-json" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], User.prototype, "userRoles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "username", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "photo_link", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "photoLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_By", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "modifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "device_id", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "geo_location", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "geoLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "login_attempt", type: "int" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "loginAttempt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gender", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "channel", type: "varchar" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "auth_token_created_at", type: "datetime", nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "authTokenCreatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "auth_token_exp_at", type: "datetime", nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "authTokenExpirationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "signup_otp", type: "longtext", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "otp_created_at", type: "datetime", nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "otpCreatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "otp_exp_at", type: "datetime", nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "otpExpDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_otp_verified", type: "boolean", default: false, nullable: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isOtpVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "oauth2_channel", type: "varchar", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "oauth2Channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "oauth2_access_token", type: "longtext", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "oauth2AccessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "oauth2_refresh_token", type: "longtext", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "oauth2RefreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "oauth2_scope", type: "longtext" }),
    __metadata("design:type", String)
], User.prototype, "oauth2Scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "oauth2_token_type", type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "oauth2TokenType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "oauth2_id_token", type: "longtext" }),
    __metadata("design:type", String)
], User.prototype, "oauth2IdToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "oauth2_user_id", type: "longtext" }),
    __metadata("design:type", String)
], User.prototype, "oauth2UserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remember_me_active", type: "boolean", default: null, nullable: undefined }),
    __metadata("design:type", Boolean)
], User.prototype, "rememberMeActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remember_me_created_date", type: "datetime", nullable: true, default: undefined }),
    __metadata("design:type", Date)
], User.prototype, "rememberMeCreatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remember_me_exp_date", type: "datetime", nullable: true, default: undefined }),
    __metadata("design:type", Date)
], User.prototype, "rememberMeExpDate", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: "users" })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map