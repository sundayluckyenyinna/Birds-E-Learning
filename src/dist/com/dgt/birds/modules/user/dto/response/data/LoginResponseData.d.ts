export declare class DateFormat {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export default class LoginResponseData {
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
}
