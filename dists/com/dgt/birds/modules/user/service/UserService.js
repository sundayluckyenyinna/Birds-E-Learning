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
const common_1 = require("@nestjs/common");
const JwtTokenUtil_1 = require("../../../security/JwtTokenUtil");
const UserRoles_1 = require("../constants/UserRoles");
const UserAuth_1 = require("../model/UserAuth");
const GenericConstants_1 = require("../../../const/GenericConstants");
const UserBasicService_1 = require("./UserBasicService");
const UserOauthService_1 = require("./UserOauthService");
const BirdsHelper_1 = require("../../../utils/BirdsHelper");
const ApplicationPropertyConfig_1 = require("../../../config/ApplicationPropertyConfig");
const UserBasicServiceUtils_1 = require("./UserBasicServiceUtils");
const environment = ApplicationPropertyConfig_1.default;
let UserService = class UserService {
    constructor(userBasicService, userOauthService, userBasicServiceUtils) {
        this.userBasicService = userBasicService;
        this.userOauthService = userOauthService;
        this.userBasicServiceUtils = userBasicServiceUtils;
    }
    async createUserBasic(requestUrl, requestDTO) {
        return Promise.resolve(this.userBasicService.createUserBasic(requestUrl, requestDTO));
    }
    async getOauth2UserConsentUrl(requestUrl, requestDTO) {
        return Promise.resolve(this.userOauthService.getOauth2UserConsentUrl(requestUrl, requestDTO));
    }
    async validateOauth2User(requestUrl, requestDTO) {
        return Promise.resolve(this.userOauthService.validateOauth2User(requestUrl, requestDTO));
    }
    async loginUserBasic(requestUrl, requestDTO) {
        return Promise.resolve(this.userBasicService.loginUserBasic(requestUrl, requestDTO));
    }
    async loginUserAutomatic(requestUrl, requestDTO) {
        return Promise.resolve(this.userBasicService.loginUserAutomatic(requestUrl, requestDTO));
    }
    validateOtp(requestUrl, requestDTO) {
        return Promise.resolve(this.userBasicService.validateOtp(requestUrl, requestDTO));
    }
    sendVerificationOtp(requestUrl, emailAddress) {
        return Promise.resolve(this.userBasicService.sendVerificationOtp(requestUrl, emailAddress));
    }
    async sendResetPasswordMail(requestUrl, emailAddress) {
        return Promise.resolve(this.userBasicService.sendResetPasswordMail(requestUrl, emailAddress));
    }
    async sendResetPasswordPage(requestUrl, encodedEmail) {
        return Promise.resolve(this.userBasicService.getPasswordResetStreamPage(requestUrl, encodedEmail));
    }
    async sendPasswordResetMailForMobile(requestUrl, email) {
        return Promise.resolve(this.userBasicService.sendResetPasswordMailForMobile(requestUrl, email));
    }
    async validateForgetPasswordOTPForMobile(requestUrl, requestDTO) {
        return Promise.resolve(this.userBasicService.validateOtpForPasswordReset(requestUrl, requestDTO));
    }
    async updateUserPasswordForMobile(requestUrl, requestDTO) {
        return Promise.resolve(this.userBasicService.updateUserPassword(requestUrl, requestDTO));
    }
    async getAllUserDetails(requestUrl, query) {
        return Promise.resolve(this.userBasicServiceUtils.fetchAllUserDetails(requestUrl, query));
    }
    async getSingleUserByEmail(requestUrl, email) {
        return Promise.resolve(this.userBasicServiceUtils.fetchSingleUser(requestUrl, email));
    }
    async updateUserDetails(requestUrl, token, requestDTO) {
        return Promise.resolve(this.userBasicServiceUtils.updateUserDetails(requestUrl, token, requestDTO));
    }
    async updateUserPassword(requestUrl, token, requestDTO) {
        return Promise.resolve(this.userBasicServiceUtils.updateUserPassword(requestUrl, token, requestDTO));
    }
    async logoutUser(requestUrl, token) {
        return Promise.resolve(this.userBasicServiceUtils.logoutUser(requestUrl, token));
    }
};
UserService.generateNewUserAuth = (tokenObject, userId, requestDTO, user) => {
    const newToken = JwtTokenUtil_1.default.generateToken(tokenObject);
    const newTokenCreatedDate = new Date();
    const newTokenExpirationDate = JwtTokenUtil_1.default.getExpirationDateFromCreationDate(newTokenCreatedDate);
    let rememberMe;
    const rememberMeExpiry = Number(environment.getProperty("birds.rememberMe.expiresIn"));
    const userAuth = UserAuth_1.default.builder()
        .userUsername(tokenObject.username)
        .userEmailAddress(tokenObject.emailAddress)
        .userId(userId)
        .authToken(newToken)
        .authTokenCreatedDate(newTokenCreatedDate)
        .authTokenExpirationDate(newTokenExpirationDate)
        .build();
    if (user.rememberMeActive === null || user.rememberMeActive === undefined) {
        rememberMe = requestDTO.rememberMe;
        userAuth.rememberMeActive = rememberMe;
        userAuth.rememberMeCreatedDate = new Date();
        userAuth.rememberMeExpDate = BirdsHelper_1.default.plusMonth(new Date(), rememberMeExpiry);
    }
    else if (!user.rememberMeActive && requestDTO.rememberMe === true) {
        rememberMe = requestDTO.rememberMe;
        userAuth.rememberMeActive = rememberMe;
        userAuth.rememberMeCreatedDate = new Date();
        userAuth.rememberMeExpDate = BirdsHelper_1.default.plusMonth(new Date(), rememberMeExpiry);
    }
    return userAuth;
};
UserService.isUserRoleValid = (roles) => {
    const validRoles = [UserRoles_1.UserRoles.STUDENT, UserRoles_1.UserRoles.INSTRUCTOR, UserRoles_1.UserRoles.ADMIN, UserRoles_1.UserRoles.CUSTOMER];
    let isValidRole = true;
    for (let i = 0; i < roles.length; i++) {
        if (!validRoles.includes(roles[i])) {
            isValidRole = false;
            break;
        }
    }
    return isValidRole;
};
UserService.getLogMessage = (...messages) => {
    return messages.join(GenericConstants_1.default.SINGLE_SPACE);
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserBasicService_1.default,
        UserOauthService_1.default,
        UserBasicServiceUtils_1.default])
], UserService);
exports.default = UserService;
//# sourceMappingURL=UserService.js.map