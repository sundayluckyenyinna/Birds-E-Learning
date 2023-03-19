/* eslint-disable */
import UserAuth from "../model/UserAuth";

export default class UserAuthBuilder
{
    private userAuth: UserAuth = new UserAuth();

    userId = (userId: string): UserAuthBuilder => { this.userAuth.userId = userId; return this; }
    userEmailAddress = (userEmailAddress: string): UserAuthBuilder => { this.userAuth.userEmailAddress = userEmailAddress; return this; }

    userUsername = (userUsername: string): UserAuthBuilder => { this.userAuth.userUsername = userUsername; return this; }
    authToken = (authToken: string): UserAuthBuilder => { this.userAuth.authToken = authToken; return this; }
    authTokenCreatedDate = (authTokenCreatedDate: Date): UserAuthBuilder => { this.userAuth.authTokenCreatedDate = authTokenCreatedDate; return this; }
    authTokenExpirationDate = (authTokenExpirationDate: Date): UserAuthBuilder => { this.userAuth.authTokenExpirationDate = authTokenExpirationDate; return this; }
    otp = (otp: string): UserAuthBuilder => { this.userAuth.otp = otp; return  this; }
    otpCreatedDate = (otpCreatedDate: Date): UserAuthBuilder => { this.userAuth.otpCreatedDate = otpCreatedDate; return  this; }
    otpExpDate = (otpExpDate: Date): UserAuthBuilder => {this.userAuth.otpExpDate = otpExpDate; return this; }

    oauth2Channel = (oauthChannel: string) => { this.userAuth.oauth2Channel = oauthChannel; return this; }
    oauth2AccessToken = (oauth2AccessToken: string) => { this.userAuth.oauth2AccessToken = oauth2AccessToken; return this; }
    oauth2RefreshToken = (oauth2RefreshToken: string) => { this.userAuth.oauth2RefreshToken = oauth2RefreshToken; return this; }
    oauth2Scope = (scope: string) => { this.userAuth.oauth2Scope = scope; return this; }

    oauth2TokenType = (tokenType: string) => { this.userAuth.oauth2TokenType = tokenType; return this; }

    oauth2IdToken = (idToken: string) => { this.userAuth.oauth2IdToken = idToken; return this; }

    oauth2UserId = (userId: string) => { this.userAuth.oauth2UserId = userId; return this; }
    rememberMeActive = (value: boolean): UserAuthBuilder => { this.userAuth.rememberMeActive = value; return this; };

    rememberMeCreatedDate = (value: Date): UserAuthBuilder => { this.userAuth.rememberMeCreatedDate = value; return this; }

    rememberMeExpDate = (value: Date): UserAuthBuilder => { this.userAuth.rememberMeExpDate = value; return this; }
    build = (): UserAuth => this.userAuth;
}