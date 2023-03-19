/* eslint-disable */
import CreateUserRequestDTO from "../dto/request/CreateUserRequestDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import LoginUserRequestDTO from "../dto/request/LoginUserRequestDTO";
import ValidateOtpRequestDTO from "../dto/request/ValidateOtpRequestDTO";
import OauthConsentUserRequestDTO from "../dto/request/OauthConsentUserRequestDTO";
import Oauth2ValidateUserRequestDTO from "../dto/request/Oauth2ValidateUserRequestDTO";

export default interface IUserService
{
    createUserBasic(requestUrl: string, requestDTO: CreateUserRequestDTO) : Promise<ResponseDTO>;
    getOauth2UserConsentUrl(requestUrl: string, requestDTO: OauthConsentUserRequestDTO): Promise<ResponseDTO>;
    validateOauth2User(requestUrl: string, requestDTO: Oauth2ValidateUserRequestDTO): Promise<ResponseDTO>;
    loginUserBasic(requestUrl: string, requestDTO: LoginUserRequestDTO): Promise<ResponseDTO>;
    validateOtp(requestUrl: string, requestDTO: ValidateOtpRequestDTO): Promise<ResponseDTO>;
    sendVerificationOtp(requestUrl: string, requestDTO);
    sendResetPasswordMail(requestUrl: string, emailAddress: string): Promise<ResponseDTO>
}