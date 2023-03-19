/* eslint-disable */
import * as jwt from 'jsonwebtoken';
import { AuthTokenObject, GenerateTokenRequestData } from "../modules/user/interfaces/UserModuleInterfaces";
import ApplicationPropertyConfig from "../config/ApplicationPropertyConfig";
import { Logger } from "@nestjs/common";
import UserAuth from "../modules/user/model/UserAuth";


/**
 * This class handles all the JWT related operations associated with JWT issuance and verification.
 */

const environment = ApplicationPropertyConfig;

export default class JwtTokenUtil
{

  static secretKey: string = environment.getProperty("birds.authorization.token.secret")
  static expirationTime: string = environment.getProperty("birds.authorization.token.expiresIn");
  static logger: Logger = new Logger(JwtTokenUtil.name);

  static generateToken = (tokenRequestData: GenerateTokenRequestData): string => {
    const requestDataJson: Object = JSON.parse(JSON.stringify(tokenRequestData));
    return jwt.sign(requestDataJson, JwtTokenUtil.secretKey);
  }

  static decodeToken = (token: string): object | undefined => {
     let decoded: object | undefined = undefined;
     try{
       decoded = jwt.verify(token, JwtTokenUtil.secretKey);
     }catch (error){
       JwtTokenUtil.logger.log("Expired token error: ".concat(error.message));
     }
     return decoded;
  }

  static getUsernameFromToken = (token: string): string => {
     return (this.decodeToken(token) as AuthTokenObject).username;
  }

  static getEmailFromToken = (token: string): string => {
    return (this.decodeToken(token) as AuthTokenObject).emailAddress;
  }

  static getChannelFromToken =(token: string): string => {
    return (this.decodeToken(token) as AuthTokenObject).channel;
  }

  static getExpirationDateFromCreationDate = (creationDate: Date): Date => {
      const minute: number = creationDate.getMinutes();
      const newMinutes: number = minute + Number(JwtTokenUtil.expirationTime);
      const expirationDate: Date = new Date();
      expirationDate.setMinutes(newMinutes, 0, 0);
      return expirationDate;
  }

  static isTokenExpired = (userAuth: UserAuth): boolean => {
     const timeDiff: number = new Date().getTime() - userAuth.authTokenExpirationDate.getTime();
     return timeDiff >= 500;   // Give a space of 50 sec for other program time usage.
  }

}