"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
class UserBuilder {
    constructor() {
        this.user = new User_1.default();
        this.userId = (value) => { this.user.userId = value; return this; };
        this.name = (value) => { this.user.name = value; return this; };
        this.firstName = (value) => { this.user.firstName = value; return this; };
        this.lastName = (value) => { this.user.lastName = value; return this; };
        this.middleName = (value) => { this.user.middleName = value; return this; };
        this.emailAddress = (value) => { this.user.emailAddress = value; return this; };
        this.emailVerifiedAt = (value) => { this.user.emailVerifiedAt = value; return this; };
        this.password = (value) => { this.user.password = value; return this; };
        this.address = (value) => { this.user.address = value; return this; };
        this.address2 = (value) => { this.user.address2 = value; return this; };
        this.mobileNumber = (value) => { this.user.mobileNumber = value; return this; };
        this.dateOfBirth = (value) => { this.user.dateOfBirth = value; return this; };
        this.city = (value) => { this.user.city = value; return this; };
        this.state = (value) => { this.user.state = value; return this; };
        this.country = (value) => { this.user.country = value; return this; };
        this.zipCode = (value) => { this.user.zipCode = value; return this; };
        this.lastLoginDate = (value) => { this.user.lastLoginDate = value; return this; };
        this.avatarId = (value) => { this.user.avatarId = value; return this; };
        this.bio = (value) => { this.user.bio = value; return this; };
        this.status = (value) => { this.user.status = value; return this; };
        this.creatUser = (value) => { this.user.createUser = value; return this; };
        this.updateUser = (value) => { this.user.updateUser = value; return this; };
        this.vendorCommissionAmount = (value) => { this.user.vendorCommissionAmount = value; return this; };
        this.vendorCommissionType = (value) => { this.user.vendorCommissionType = value; return this; };
        this.education = (value) => { this.user.education = value; return this; };
        this.experience = (value) => { this.user.experience = value; return this; };
        this.socialMedia = (value) => { this.user.socialMedia = value; return this; };
        this.billingFirstName = (value) => { this.user.billingFirstName = value; return this; };
        this.billingLastName = (value) => { this.user.billingLastName = value; return this; };
        this.billingAddress = (value) => { this.user.billingAddress = value; return this; };
        this.billingAddress2 = (value) => { this.user.billingAddress2 = value; return this; };
        this.billingPhone = (value) => { this.user.billingPhone = value; return this; };
        this.billingCity = (value) => { this.user.billingCity = value; return this; };
        this.billingState = (value) => { this.user.billingState = value; return this; };
        this.billingCountry = (value) => { this.user.billingCountry = value; return this; };
        this.billingZipCode = (value) => { this.user.billingZipCode = value; return this; };
        this.deletedAt = (value) => { this.user.deletedAt = value; return this; };
        this.authToken = (value) => { this.user.authToken = value; return this; };
        this.createdAt = (value) => { this.user.createdAt = value; return this; };
        this.updatedAt = (value) => { this.user.updatedAt = value; return this; };
        this.paymentGateway = (value) => { this.user.paymentGateway = value; return this; };
        this.totalGuest = (value) => { this.user.totalGuest = value; return this; };
        this.verifySubmitStatus = (value) => { this.user.verifySubmitStatus = value; return this; };
        this.isVerified = (value) => { this.user.isVerified = value; return this; };
        this.businessName = (value) => { this.user.businessName = value; return this; };
        this.locale = (value) => { this.user.locale = value; return this; };
        this.userRoles = (value) => { this.user.userRoles = value; return this; };
        this.username = (value) => { this.user.username = value; return this; };
        this.photoLink = (value) => { this.user.photoLink = value; return this; };
        this.createdBy = (value) => { this.user.createdBy = value; return this; };
        this.modifiedBy = (value) => { this.user.modifiedBy = value; return this; };
        this.deviceId = (value) => { this.user.deviceId = value; return this; };
        this.geoLocation = (value) => { this.user.geoLocation = value; return this; };
        this.loginAttempt = (value) => { this.user.loginAttempt = value; return this; };
        this.gender = (value) => { this.user.gender = value; return this; };
        this.channel = (value) => { this.user.channel = value; return this; };
        this.authTokenCreatedDate = (value) => { this.user.authTokenCreatedDate = value; return this; };
        this.authTokenExpirationDate = (value) => { this.user.authTokenExpirationDate = value; return this; };
        this.otp = (value) => { this.user.otp = value; return this; };
        this.otpCreatedDate = (value) => { this.user.otpCreatedDate = value; return this; };
        this.otpExpDate = (value) => { this.user.otpExpDate = value; return this; };
        this.isOtpVerified = (value) => { this.user.isOtpVerified = value; return this; };
        this.oauth2Channel = (value) => { this.user.oauth2Channel = value; return this; };
        this.oauth2AccessToken = (value) => { this.user.oauth2AccessToken = value; return this; };
        this.oauth2RefreshToken = (value) => { this.user.oauth2RefreshToken = value; return this; };
        this.oauth2Scope = (value) => { this.user.oauth2Scope = value; return this; };
        this.oauth2TokenType = (value) => { this.user.oauth2TokenType = value; return this; };
        this.oauth2IdToken = (value) => { this.user.oauth2IdToken = value; return this; };
        this.oauth2UserId = (value) => { this.user.oauth2UserId = value; return this; };
        this.rememberMeActive = (value) => { this.user.rememberMeActive = true; return this; };
        this.rememberMeCreatedDate = (value) => { this.user.rememberMeCreatedDate = value; return this; };
        this.rememberMeExpDate = (value) => { this.user.rememberMeExpDate = value; return this; };
        this.build = () => this.user;
    }
}
exports.default = UserBuilder;
//# sourceMappingURL=UserBuilder.js.map