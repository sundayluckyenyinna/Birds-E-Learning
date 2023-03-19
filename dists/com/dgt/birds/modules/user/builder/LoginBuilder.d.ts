import UserLogin from "../model/UserLogin";
export default class LoginBuilder {
    private login;
    constructor();
    userId: (value: string) => LoginBuilder;
    userEmail: (value: string) => LoginBuilder;
    username: (value: string) => LoginBuilder;
    createdDate: (value: Date) => LoginBuilder;
    channel: (value: string) => LoginBuilder;
    loginAuthToken: (value: string) => LoginBuilder;
    loginAuthTokenCreatedDate: (value: Date) => LoginBuilder;
    loginAuthTokenExpDate: (value: Date) => LoginBuilder;
    userDeviceId: (value: string) => LoginBuilder;
    build: () => UserLogin;
}
