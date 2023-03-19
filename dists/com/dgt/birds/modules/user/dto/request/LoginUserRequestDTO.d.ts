export default class LoginUserRequestDTO {
    email: string;
    password: string;
    channel: string;
    deviceId: string;
    rememberMe: boolean;
    loginBy: string;
    constructor(email: string, password: string);
}
export declare class AutomaticLoginRequestDTO {
    deviceId: string;
    channel: string;
}
