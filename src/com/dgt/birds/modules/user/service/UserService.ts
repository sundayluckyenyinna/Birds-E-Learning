/* eslint-disable */
import IUserService from "./IUserService";
import CreateUserRequestDTO from "../dto/request/CreateUserRequestDTO";
import { Injectable } from "@nestjs/common";
import ResponseDTO from "../../../config/ResponseDTO";
import {
  AuthTokenObject
} from "../interfaces/UserModuleInterfaces";
import JwtTokenUtil from "../../../security/JwtTokenUtil";
import { UserRoles } from "../constants/UserRoles";
import UserAuth from "../model/UserAuth";
import LoginUserRequestDTO, { AutomaticLoginRequestDTO } from "../dto/request/LoginUserRequestDTO";
import ValidateOtpRequestDTO from "../dto/request/ValidateOtpRequestDTO";
import GenericConstants from "../../../const/GenericConstants";
import UserBasicService from "./UserBasicService";
import OauthConsentUserRequestDTO from "../dto/request/OauthConsentUserRequestDTO";
import UserOauthService from "./UserOauthService";
import Oauth2ValidateUserRequestDTO from "../dto/request/Oauth2ValidateUserRequestDTO";
import UpdatePasswordRequestDTO from "../dto/request/UpdatePasswordRequestDTO";
import User from "../model/User";
import BirdsHelper from "../../../utils/BirdsHelper";
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";
import UserBasicServiceUtils, { UserDetailsQueryParams } from "./UserBasicServiceUtils";
import UpdateUserDetailsRequestDTO from "../dto/request/UpdateUserDetailsRequestDTO";
import UpdateUserPasswordRequestDTO from "../dto/request/UpdateUserPasswordRequestDTO";


const environment = ApplicationPropertyConfig;
@Injectable()
export default class UserService implements IUserService
{

   constructor(private readonly userBasicService: UserBasicService,
               private readonly userOauthService: UserOauthService,
               private readonly userBasicServiceUtils: UserBasicServiceUtils
   ) {
   }
    async createUserBasic(requestUrl: string, requestDTO: CreateUserRequestDTO): Promise<ResponseDTO> {
        return Promise.resolve(this.userBasicService.createUserBasic(requestUrl, requestDTO));
    }
    async getOauth2UserConsentUrl(requestUrl: string, requestDTO: OauthConsentUserRequestDTO) {
        return Promise.resolve(this.userOauthService.getOauth2UserConsentUrl(requestUrl, requestDTO));
    }

    async validateOauth2User(requestUrl: string, requestDTO: Oauth2ValidateUserRequestDTO): Promise<ResponseDTO> {
        return Promise.resolve(this.userOauthService.validateOauth2User(requestUrl, requestDTO));
    }
    async loginUserBasic(requestUrl: string, requestDTO: LoginUserRequestDTO): Promise<ResponseDTO> {
        return Promise.resolve(this.userBasicService.loginUserBasic(requestUrl, requestDTO));
    }

    async loginUserAutomatic(requestUrl: string, requestDTO: AutomaticLoginRequestDTO): Promise<ResponseDTO> {
       return Promise.resolve(this.userBasicService.loginUserAutomatic(requestUrl, requestDTO));
    }

    validateOtp(requestUrl: string, requestDTO: ValidateOtpRequestDTO): Promise<ResponseDTO> {
        return Promise.resolve(this.userBasicService.validateOtp(requestUrl, requestDTO));
    }
    sendVerificationOtp(requestUrl: string, emailAddress: string) {
        return Promise.resolve(this.userBasicService.sendVerificationOtp(requestUrl, emailAddress));
    }

    async sendResetPasswordMail(requestUrl: string, emailAddress: string): Promise<ResponseDTO> {
       return Promise.resolve(this.userBasicService.sendResetPasswordMail(requestUrl, emailAddress));
    }

    async sendResetPasswordPage(requestUrl: string, encodedEmail: string): Promise<string> {
        return Promise.resolve(this.userBasicService.getPasswordResetStreamPage(requestUrl, encodedEmail));
    }

    async sendPasswordResetMailForMobile(requestUrl: string, email: string): Promise<ResponseDTO>{
        return Promise.resolve(this.userBasicService.sendResetPasswordMailForMobile(requestUrl, email));
    }

    async validateForgetPasswordOTPForMobile(requestUrl: string, requestDTO: ValidateOtpRequestDTO): Promise<ResponseDTO>{
       return Promise.resolve(this.userBasicService.validateOtpForPasswordReset(requestUrl, requestDTO));
    }

    async updateUserPasswordForMobile(requestUrl: string, requestDTO: UpdatePasswordRequestDTO): Promise<ResponseDTO>{
        return Promise.resolve(this.userBasicService.updateUserPassword(requestUrl, requestDTO));
    }

    async getAllUserDetails(requestUrl: string, query: UserDetailsQueryParams): Promise<ResponseDTO>{
       return Promise.resolve(this.userBasicServiceUtils.fetchAllUserDetails(requestUrl, query));
    }

    async getSingleUserByEmail(requestUrl: string, email: string): Promise<ResponseDTO>{
       return Promise.resolve(this.userBasicServiceUtils.fetchSingleUser(requestUrl, email));
    }

    async updateUserDetails(requestUrl: string, token: string, requestDTO: UpdateUserDetailsRequestDTO): Promise<ResponseDTO>{
       return Promise.resolve(this.userBasicServiceUtils.updateUserDetails(requestUrl, token, requestDTO));
    }

    async updateUserPassword(requestUrl: string, token: string, requestDTO: UpdateUserPasswordRequestDTO): Promise<ResponseDTO>{
       return Promise.resolve(this.userBasicServiceUtils.updateUserPassword(requestUrl, token, requestDTO));
    }

    async logoutUser(requestUrl: string, token: string): Promise<ResponseDTO>{
       return Promise.resolve(this.userBasicServiceUtils.logoutUser(requestUrl, token));
    }

  public static generateNewUserAuth = (tokenObject: AuthTokenObject, userId: string, requestDTO: LoginUserRequestDTO, user: User): UserAuth => {
        const newToken: string = JwtTokenUtil.generateToken(tokenObject);
        const newTokenCreatedDate: Date = new Date();
        const newTokenExpirationDate: Date = JwtTokenUtil.getExpirationDateFromCreationDate(newTokenCreatedDate);
        let rememberMe: Boolean;
        const rememberMeExpiry: number = Number(environment.getProperty("birds.rememberMe.expiresIn"));
        const userAuth: UserAuth = UserAuth.builder()
                      .userUsername(tokenObject.username)
                      .userEmailAddress(tokenObject.emailAddress)
                      .userId(userId)
                      .authToken(newToken)
                      .authTokenCreatedDate(newTokenCreatedDate)
                      .authTokenExpirationDate(newTokenExpirationDate)
                      .build();
        if(user.rememberMeActive === null || user.rememberMeActive === undefined) {
            rememberMe = requestDTO.rememberMe;
            userAuth.rememberMeActive = rememberMe as boolean;
            userAuth.rememberMeCreatedDate = new Date();
            userAuth.rememberMeExpDate = BirdsHelper.plusMonth(new Date(), rememberMeExpiry);
        }
        else if(!user.rememberMeActive && requestDTO.rememberMe === true){
          rememberMe = requestDTO.rememberMe;
          userAuth.rememberMeActive = rememberMe as boolean;
          userAuth.rememberMeCreatedDate = new Date();
          userAuth.rememberMeExpDate = BirdsHelper.plusMonth(new Date(), rememberMeExpiry);
        }
        return userAuth;
    }

    public static isUserRoleValid = (roles: Array<String>): boolean => {
       const validRoles: Array<String> = [UserRoles.STUDENT, UserRoles.INSTRUCTOR, UserRoles.ADMIN, UserRoles.CUSTOMER];
       let isValidRole: boolean = true;
       for(let i = 0; i < roles.length; i++){
         if(!validRoles.includes(roles[i])){
           isValidRole = false;
           break;
         }
       }
       return isValidRole;
    }

    public static getLogMessage = (...messages: Array<string>): string => {
        return messages.join(GenericConstants.SINGLE_SPACE);
    }
}