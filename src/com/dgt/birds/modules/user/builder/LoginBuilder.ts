/* eslint-disable */

import UserLogin from "../model/UserLogin";

export default class LoginBuilder
{

    private login: UserLogin = new UserLogin();
    constructor() {
    }
      userId = (value: string ): LoginBuilder => { this.login.userId = value; return this; };

      userEmail = (value: string): LoginBuilder => { this.login.userEmail = value; return this; }

      username = (value: string): LoginBuilder => { this.login.username = value; return this;}

      createdDate = (value: Date): LoginBuilder => { this.login.createdDate = value; return this; }

      channel = (value: string): LoginBuilder => { this.login.channel = value; return this; }

      loginAuthToken = (value: string): LoginBuilder => { this.login.loginAuthToken = value; return  this; }

      loginAuthTokenCreatedDate = (value: Date): LoginBuilder => { this.login.loginAuthTokenCreatedDate = value; return this; }

      loginAuthTokenExpDate = (value: Date): LoginBuilder => { this.login.loginAuthTokenExpDate = value; return this; }

      userDeviceId = (value: string): LoginBuilder => { this.login.userDeviceId = value; return this; }
      build = () => this.login;
}