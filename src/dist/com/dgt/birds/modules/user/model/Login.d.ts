import LoginBuilder from "../builder/LoginBuilder";
export default class Login {
    id: number;
    userId: string;
    userEmail: string;
    username: string;
    createdDate: Date;
    channel: string;
    loginAuthToken: string;
    loginAuthTokenCreatedDate: Date;
    loginAuthTokenExpDate: Date;
    static builder: () => LoginBuilder;
}
