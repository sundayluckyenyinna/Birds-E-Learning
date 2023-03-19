"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserAuth_1 = require("../model/UserAuth");
class UserAuthBuilder {
    constructor() {
        this.userAuth = new UserAuth_1.default();
        this.userId = (userId) => { this.userAuth.userId = userId; return this; };
        this.userEmailAddress = (userEmailAddress) => { this.userAuth.userEmailAddress = userEmailAddress; return this; };
        this.userUsername = (userUsername) => { this.userAuth.userUsername = userUsername; return this; };
        this.authToken = (authToken) => { this.userAuth.authToken = authToken; return this; };
        this.authTokenCreatedDate = (authTokenCreatedDate) => { this.userAuth.authTokenCreatedDate = authTokenCreatedDate; return this; };
        this.authTokenExpirationDate = (authTokenExpirationDate) => { this.userAuth.authTokenExpirationDate = authTokenExpirationDate; return this; };
        this.otp = (otp) => { this.userAuth.otp = otp; return this; };
        this.otpCreatedDate = (otpCreatedDate) => { this.userAuth.otpCreatedDate = otpCreatedDate; return this; };
        this.otpExpDate = (otpExpDate) => { this.userAuth.otpExpDate = otpExpDate; return this; };
        this.oauth2Channel = (oauthChannel) => { this.userAuth.oauth2Channel = oauthChannel; return this; };
        this.oauth2AccessToken = (oauth2AccessToken) => { this.userAuth.oauth2AccessToken = oauth2AccessToken; return this; };
        this.oauth2RefreshToken = (oauth2RefreshToken) => { this.userAuth.oauth2RefreshToken = oauth2RefreshToken; return this; };
        this.oauth2Scope = (scope) => { this.userAuth.oauth2Scope = scope; return this; };
        this.oauth2TokenType = (tokenType) => { this.userAuth.oauth2TokenType = tokenType; return this; };
        this.oauth2IdToken = (idToken) => { this.userAuth.oauth2IdToken = idToken; return this; };
        this.oauth2UserId = (userId) => { this.userAuth.oauth2UserId = userId; return this; };
        this.rememberMeActive = (value) => { this.userAuth.rememberMeActive = value; return this; };
        this.rememberMeCreatedDate = (value) => { this.userAuth.rememberMeCreatedDate = value; return this; };
        this.rememberMeExpDate = (value) => { this.userAuth.rememberMeExpDate = value; return this; };
        this.build = () => this.userAuth;
    }
}
exports.default = UserAuthBuilder;
//# sourceMappingURL=UserAuthBuilder.js.map