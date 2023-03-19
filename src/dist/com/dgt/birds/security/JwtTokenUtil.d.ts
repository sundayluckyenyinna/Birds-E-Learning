import { GenerateTokenRequestData } from "../modules/user/interfaces/UserModuleInterfaces";
import { Logger } from "@nestjs/common";
import UserAuth from "../modules/user/model/UserAuth";
export default class JwtTokenUtil {
    static secretKey: string;
    static expirationTime: string;
    static logger: Logger;
    static generateToken: (tokenRequestData: GenerateTokenRequestData) => string;
    static decodeToken: (token: string) => object | undefined;
    static getUsernameFromToken: (token: string) => string;
    static getEmailFromToken: (token: string) => string;
    static getChannelFromToken: (token: string) => string;
    static getExpirationDateFromCreationDate: (creationDate: Date) => Date;
    static isTokenExpired: (userAuth: UserAuth) => boolean;
}
