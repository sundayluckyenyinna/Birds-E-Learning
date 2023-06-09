import User from "../model/User";
export default class UserBuilder {
    private user;
    userId: (value: string) => this;
    name: (value: string) => this;
    firstName: (value: string) => this;
    lastName: (value: string) => this;
    middleName: (value: string) => this;
    emailAddress: (value: string) => this;
    emailVerifiedAt: (value: Date) => this;
    password: (value: string) => this;
    address: (value: string) => this;
    address2: (value: string) => this;
    mobileNumber: (value: string) => this;
    dateOfBirth: (value: string) => this;
    city: (value: string) => this;
    state: (value: string) => this;
    country: (value: string) => this;
    zipCode: (value: number) => this;
    lastLoginDate: (value: Date) => this;
    avatarId: (value: number) => this;
    bio: (value: string) => this;
    status: (value: string) => this;
    creatUser: (value: number) => this;
    updateUser: (value: number) => this;
    vendorCommissionAmount: (value: number) => this;
    vendorCommissionType: (value: string) => this;
    education: (value: Array<Education>) => this;
    experience: (value: Array<Experience>) => this;
    socialMedia: (value: object) => this;
    billingFirstName: (value: string) => this;
    billingLastName: (value: string) => this;
    billingAddress: (value: string) => this;
    billingAddress2: (value: string) => this;
    billingPhone: (value: string) => this;
    billingCity: (value: string) => this;
    billingState: (value: string) => this;
    billingCountry: (value: string) => this;
    billingZipCode: (value: number) => this;
    deletedAt: (value: Date) => this;
    authToken: (value: string) => this;
    createdAt: (value: Date) => this;
    updatedAt: (value: Date) => this;
    paymentGateway: (value: string) => this;
    totalGuest: (value: number) => this;
    verifySubmitStatus: (value: string) => this;
    isVerified: (value: boolean) => this;
    businessName: (value: string) => this;
    locale: (value: string) => this;
    userRoles: (value: Array<string>) => this;
    username: (value: string) => this;
    photoLink: (value: string) => this;
    createdBy: (value: string) => this;
    modifiedBy: (value: string) => this;
    deviceId: (value: string) => this;
    geoLocation: (value: string) => this;
    loginAttempt: (value: number) => this;
    gender: (value: string) => this;
    channel: (value: string) => this;
    authTokenCreatedDate: (value: Date) => this;
    authTokenExpirationDate: (value: Date) => this;
    otp: (value: string) => this;
    otpCreatedDate: (value: Date) => this;
    otpExpDate: (value: Date) => this;
    isOtpVerified: (value: boolean) => this;
    oauth2Channel: (value: string) => this;
    oauth2AccessToken: (value: string) => this;
    oauth2RefreshToken: (value: string) => this;
    oauth2Scope: (value: string) => this;
    oauth2TokenType: (value: string) => this;
    oauth2IdToken: (value: string) => this;
    oauth2UserId: (value: string) => this;
    rememberMeActive: (value: boolean) => this;
    rememberMeCreatedDate: (value: Date) => this;
    rememberMeExpDate: (value: Date) => this;
    build: () => User;
}
export interface Education {
    from: string;
    to: string;
    location: string;
    reward: string;
}
export interface Experience {
    from: string;
    to: string;
    location: string;
    position: string;
}
