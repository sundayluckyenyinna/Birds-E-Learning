import { UserGender } from "../../constants/UserGender";
export default class CreateUserRequestDTO {
    firstName: string;
    lastName: string;
    middleName: string;
    address: string;
    emailAddress: string;
    mobileNumber: string;
    dateOfBirth: string;
    userRoles: Array<string>;
    username: string;
    password: string;
    photo: string;
    deviceId: string;
    geoLocation: string;
    gender: UserGender;
    language: string;
    city: string;
    country: string;
    channel: string;
    rememberMe: boolean;
    signupBy: string;
}
