import LoginBuilder from "../builder/LoginBuilder";
export default class UserLogin {
    id: number;
    userId: string;
    userEmail: string;
    username: string;
    createdDate: Date;
    channel: string;
    loginAuthToken: string;
    loginAuthTokenCreatedDate: Date;
    loginAuthTokenExpDate: Date;
    userDeviceId: any;
    static builder: () => LoginBuilder;
}
