export interface DBOperationResult {
    status: boolean;
    entity: Object;
    errorMessage?: string;
}
export interface IResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData?: Object | null;
}
export interface CreateUserResponseData {
    emailAddress: string;
    username: string;
    createdDate: Date;
    deviceId?: string;
}
export interface AuthTokenObject {
    username: string;
    emailAddress: string;
    issueDate: Date;
    channel: string;
}
export interface LoginUserResponseData {
    userId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    fullName: string;
    address: string;
    mobileNumber: any;
    status: string;
    dateOfBirth: DateFormat;
    lastLoginDate: DateFormat;
    photoLink: string;
    createdDate: DateFormat;
    modifiedDate: DateFormat;
    deviceId: string;
    geoLocation: string;
    gender: string;
    language: string;
    city: string;
    country: string;
    authToken: string;
    rememberMeActive: boolean;
}
export interface GenerateTokenRequestData {
    username: string;
    emailAddress: string;
}
export interface DateFormat {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export interface GoogleOauth2UserProfile {
    id: string;
    email: string;
    verified_email: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}
