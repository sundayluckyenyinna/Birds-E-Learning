import UserAuth from "../model/UserAuth";
export default class UserAuthBuilder {
    private userAuth;
    userId: (userId: string) => UserAuthBuilder;
    userEmailAddress: (userEmailAddress: string) => UserAuthBuilder;
    userUsername: (userUsername: string) => UserAuthBuilder;
    authToken: (authToken: string) => UserAuthBuilder;
    authTokenCreatedDate: (authTokenCreatedDate: Date) => UserAuthBuilder;
    authTokenExpirationDate: (authTokenExpirationDate: Date) => UserAuthBuilder;
    otp: (otp: string) => UserAuthBuilder;
    otpCreatedDate: (otpCreatedDate: Date) => UserAuthBuilder;
    otpExpDate: (otpExpDate: Date) => UserAuthBuilder;
    oauth2Channel: (oauthChannel: string) => this;
    oauth2AccessToken: (oauth2AccessToken: string) => this;
    oauth2RefreshToken: (oauth2RefreshToken: string) => this;
    oauth2Scope: (scope: string) => this;
    oauth2TokenType: (tokenType: string) => this;
    oauth2IdToken: (idToken: string) => this;
    oauth2UserId: (userId: string) => this;
    rememberMeActive: (value: boolean) => UserAuthBuilder;
    rememberMeCreatedDate: (value: Date) => UserAuthBuilder;
    rememberMeExpDate: (value: Date) => UserAuthBuilder;
    build: () => UserAuth;
}
