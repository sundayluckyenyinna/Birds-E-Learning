"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserLogin_1 = require("../model/UserLogin");
class LoginBuilder {
    constructor() {
        this.login = new UserLogin_1.default();
        this.userId = (value) => { this.login.userId = value; return this; };
        this.userEmail = (value) => { this.login.userEmail = value; return this; };
        this.username = (value) => { this.login.username = value; return this; };
        this.createdDate = (value) => { this.login.createdDate = value; return this; };
        this.channel = (value) => { this.login.channel = value; return this; };
        this.loginAuthToken = (value) => { this.login.loginAuthToken = value; return this; };
        this.loginAuthTokenCreatedDate = (value) => { this.login.loginAuthTokenCreatedDate = value; return this; };
        this.loginAuthTokenExpDate = (value) => { this.login.loginAuthTokenExpDate = value; return this; };
        this.userDeviceId = (value) => { this.login.userDeviceId = value; return this; };
        this.build = () => this.login;
    }
}
exports.default = LoginBuilder;
//# sourceMappingURL=LoginBuilder.js.map