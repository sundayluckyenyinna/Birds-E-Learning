import UserAuthBuilder from "../builder/UserAuthBuilder";
export default class UserAuth {
    id: number;
    userId: string;
    userEmailAddress: string;
    userUsername: string;
    authToken: string;
    authTokenCreatedDate: Date;
    authTokenExpirationDate: Date;
    otp: string;
    otpCreatedDate: Date;
    otpExpDate: Date;
    isOtpVerified: boolean;
    oauth2Channel: string;
    oauth2AccessToken: string;
    oauth2RefreshToken: string;
    oauth2Scope: string;
    oauth2TokenType: string;
    oauth2IdToken: string;
    oauth2UserId: string;
    rememberMeActive: boolean;
    rememberMeCreatedDate: Date;
    rememberMeExpDate: Date;
    static builder: () => UserAuthBuilder;
}
